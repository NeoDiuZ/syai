require('dotenv').config({ path: '.env.local' });
const { db } = require('@vercel/postgres');
const { promises: fs } = require('fs');
const path = require('path');

async function seedTeam(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "team" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS team (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        "imageUrl" VARCHAR(255),
        "linkedinUrl" VARCHAR(255)
      );
    `;
    console.log(`Created "team" table`);

    // Read the team.json file
    const filePath = path.join(process.cwd(), 'data/team.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const teamMembers = JSON.parse(fileContents);

    // Insert data into the "team" table
    const insertedTeamMembers = await Promise.all(
      teamMembers.map(async (member) => {
        return client.sql`
        INSERT INTO team (name, role, "imageUrl", "linkedinUrl")
        VALUES (${member.name}, ${member.role}, ${member.imageUrl}, ${member.linkedinUrl})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedTeamMembers.length} team members`);

    return {
      createTable,
      team: insertedTeamMembers,
    };
  } catch (error) {
    console.error('Error seeding team:', error);
    throw error;
  }
}

async function seedLinks(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Create the "links" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS linkinbio (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          url VARCHAR(255) NOT NULL
        );
      `;
  
      console.log(`Created "linkinbio" table`);
  
      // Read the linkinbio.json file
      const filePath = path.join(process.cwd(), 'data/linkinbio.json');
      const fileContents = await fs.readFile(filePath, 'utf8');
      const links = JSON.parse(fileContents);
  
      // Insert data into the "linkinbio" table
      const insertedLinks = await Promise.all(
        links.map(async (link) => {
          return client.sql`
          INSERT INTO linkinbio (title, url)
          VALUES (${link.title}, ${link.url})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
      );
  
      console.log(`Seeded ${insertedLinks.length} links`);
  
      return {
        createTable,
        links: insertedLinks,
      };
    } catch (error) {
      console.error('Error seeding links:', error);
      throw error;
    }
}


async function main() {
  const client = await db.connect();

  await seedTeam(client);
  await seedLinks(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
}); 