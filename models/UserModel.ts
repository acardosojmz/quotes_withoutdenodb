
import { connectorMariaDB } 
from "../config/connectors.ts";  


export default  {
    /**
     * Takes in the id params & checks if the user item exists
     * in the database
     * @param id
     * @returns boolean to tell if an entry of user exits in table
     */
    existById: async (id:number) => {
        const [result] = await connectorMariaDB.query(
            `SELECT COUNT(*) count FROM user WHERE id = ? LIMIT 1`,
            [id],
          );
          return result.count > 0;
    },

    /**
     * Takes in the id params & checks if the user item exists
     * in the database
     * @param id
     * @returns boolean to tell if an entry of user exits in table
     */
     isLogin: async ( account:string, password:string) => {
        const [result] = await connectorMariaDB.query(
            `SELECT COUNT(*) count FROM user WHERE account=? AND password=?`,
            [account, password],
          );
          return result.count > 0;
    },


    /**
     * Will return all the entries in the user column
     * @returns array of users
     */
    getAll: async () => {
        return await connectorMariaDB.query(`SELECT * FROM user`);
      },

    /**
     * Takes in the id params & returns the user item found
     * against it.
     * @param id
     * @returns object of user item
     */
    getById: async ( id:number) => {
        return await connectorMariaDB.query(
            "select * from user where id = ?",
            [id],
          );
    },


    /**
     * Adds a new user item to user table
     * @param user
     */
    add: async (account:string, password:string) => {
            return await connectorMariaDB.query(
              `INSERT INTO user(account, password) values(?, ?)`,
              [
                account,
                password,
              ],
            );
          },

    /**
     * Updates the content of a single user item
     * @param id
     * @param account
     * @param password
     * @returns integer (count of effect rows)
     */
    updateById: async (id:number, account:string, password:string) => {

        const result = await connectorMariaDB.query(
            `UPDATE user SET account=?, password=? WHERE id=?`,
            [
              account,
              password,
              id,
            ],
          );
          return result.affectedRows;

    },

    /**
     * Deletes a User by ID
     * @param id
     * @returns integer (count of effect rows)
     */
     deleteById: async (id:number) => {
        const result = await connectorMariaDB.query(
            `DELETE FROM user WHERE id = ?`,
            [id],
          );
          // return count of rows updated
          return result.affectedRows;

     },
};
