import User from "./User"

class Employee {
    public id?: number
    public first_name: string = ''
    public last_name: string = ''
    public is_admin?: boolean
    public user_id: number = 0
    public user?: User
}

export default Employee
