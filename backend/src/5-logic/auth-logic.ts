import { OkPacket } from "mysql"
import dal from "../2-utills/dal"
import UserModel from "../4-models/user-model"
import cyber from "../2-utills/cyber"
import { ResourceNotFoundErrorModel, UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/error-models"
import RoleModel from "../4-models/role-model"
import CredentialsModel from "../4-models/credentials-model"

async function getAllUsers(): Promise<UserModel[]> {
    const sql = `SELECT * FROM users`
    const users = dal.execute(sql)
    return users
}

async function getUser(id: number): Promise<UserModel> {

    const sql = `SELECT * FROM usersWHERE userId = ?`
    const users = await dal.execute(sql, [id])
    if (users.length === 0) throw new ResourceNotFoundErrorModel(id)
    const user = users[0]
    return user
}

async function isEmailTaken(email: string) {

    const sql = ` SELECT COUNT(*) AS count
    FROM users
    WHERE email = ?`

    const result = await dal.execute(sql, [email])

    return result[0].count > 0
}

async function register(newUser: UserModel): Promise<string> {

    const error = newUser.validate()
    if (error) throw new ValidationErrorModel(error)

    if (await isEmailTaken(newUser.email)) throw new ValidationErrorModel(`This email :${newUser.email}  has already been taken!`)

    newUser.role = RoleModel.User;

    // Hash password:
    newUser.password = cyber.hash(newUser.password);

    // Create sql query:
    const sql = "INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)"

    // Add to database:
    const info: OkPacket = await dal.execute(sql, [
        newUser.firstName,
        newUser.lastName,
        newUser.email,
        newUser.password,
        newUser.role]);

    // Set back id:
    newUser.userId = info.insertId;

    // Create token:
    const token = cyber.getNewToken(newUser);

    // Return token:
    return token;

}

async function login(credentials: CredentialsModel): Promise<string> {
    const error = credentials.validate()
    if (error) throw new ValidationErrorModel(error)

    credentials.password = cyber.hash(credentials.password)

    const sql = "SELECT * FROM users WHERE email = ? AND password = ? "

    const users = await dal.execute(sql, [credentials.email, credentials.password])

    const user = users[0]


    if (!user) throw new UnauthorizedErrorModel("Incorrect email or password")

    const token = cyber.getNewToken(user)
    return token
}

export default {
    getAllUsers,
    register,
    login,
    getUser
}