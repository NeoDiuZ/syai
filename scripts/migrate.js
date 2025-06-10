require('dotenv').config({ path: '.env.local' });
const { db } = require('@vercel/postgres');

const boardMemberNames = [
    "Raymond Loong Ng", "Zaer", "Soh Hong Yu", "Cleveland"
];
const executiveCommitteeNames = [
    "Raymond Loong Ng", "Soh Hong Yu", "Soh Tze Aan", "Xie, Kaiwen", "Kaleb Nim", "Yovita Singh Jolly"
];
const subcommitteeNames = [
    "Ang Zi En Sherlyn", "Zhu bolin", "Beth Anne Teo", "Nor Syarah Natasha", "Jaslyn Tan Xuan Ning", "Vaithiyanathan Sri Kesava Raman", "Lim Le Shi", "Cham Si Ao", "Vijeyakumar Dakshaa", "Min Thet Khine", "Perynn Neo Chew Yee Jing"
];

async function migrateTeamTable(client) {
    try {
        console.log('Altering "team" table to add "group" and "display_order" columns...');
        await client.sql`
            ALTER TABLE team 
            ADD COLUMN IF NOT EXISTS "group" VARCHAR(50),
            ADD COLUMN IF NOT EXISTS "display_order" INTEGER;
        `;
        console.log('Table altered successfully.');

        const updatePromises = [];

        // Update Board Members
        boardMemberNames.forEach((name, index) => {
            updatePromises.push(client.sql`
                UPDATE team 
                SET "group" = 'Board Members', "display_order" = ${index} 
                WHERE name = ${name};
            `);
        });

        // Update Executive Committee
        executiveCommitteeNames.forEach((name, index) => {
            updatePromises.push(client.sql`
                UPDATE team 
                SET "group" = 'Executive Committee', "display_order" = ${index} 
                WHERE name = ${name} AND "group" IS NULL; 
            `);
        });

        // Update Subcommittee
        subcommitteeNames.forEach((name, index) => {
            updatePromises.push(client.sql`
                UPDATE team 
                SET "group" = 'Subcommittee', "display_order" = ${index} 
                WHERE name = ${name} AND "group" IS NULL;
            `);
        });

        console.log('Updating groups and display order for existing members...');
        await Promise.all(updatePromises);
        console.log('Members updated successfully.');

    } catch (error) {
        console.error('Error migrating team table:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();
    await migrateTeamTable(client);
    await client.end();
}

main().catch((err) => {
    console.error('An error occurred during database migration:', err);
}); 