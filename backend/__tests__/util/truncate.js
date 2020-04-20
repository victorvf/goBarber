import Database from '../../src/database';

export default function truncate() {
    return Promise.all(
        Object.keys(Database.connection.models).map(key => {
            return Database.connection.models[key].destroy({
                truncate: true,
                force: true
            });
        })
    );
}
