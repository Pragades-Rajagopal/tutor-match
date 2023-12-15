'use strict'
module.exports = async function seed({ entities, db, sql }) {
    await db.query(sql`
        DELETE FROM courses;
    `);
}