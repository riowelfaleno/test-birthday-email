import moment from "moment";
import {
  CreateUserParam,
  DeleteUserParam,
  UpdateUserParam,
} from "./user.interface";
import userModel, { IUserLean } from "./user.model";

export class UserService {
  public async createUser(param: CreateUserParam) {
    /** Check if email exist */
    const checkEmailExist = await userModel.findOne({
      email: param.email,
      isDeleted: false,
    });
    if (checkEmailExist) {
      throw new Error("Email already exists");
    }

    const createParam: IUserLean = {
      firstName: param.firstName,
      lastName: param.lastName,
      email: param.email,
      dob: moment(param.dob).toDate(),
      timezone: param.timezone,
    };

    const createUser = await userModel.create(createParam);

    return createUser;
  }

  public async deleteUser(param: DeleteUserParam) {
    const checkEmailExist = await userModel.findOne({
      email: param.email,
      isDeleted: false,
    });
    if (!checkEmailExist) {
      throw new Error("User not found");
    }

    const deleteUser = await userModel.findOneAndUpdate(
      { email: param.email },
      { isDeleted: true }
    );

    return deleteUser;
  }

  public async updateUser(param: UpdateUserParam) {
    const checkEmailExist = await userModel.findOne({
      email: param.email,
      isDeleted: false,
    });
    if (!checkEmailExist) {
      throw new Error("User not found");
    }

    const updateParam: IUserLean = {
      firstName: param.firstName,
      lastName: param.lastName,
      email: param.email,
      dob: moment(param.dob).toDate(),
      timezone: param.timezone,
    };

    const updateUser = await userModel.findByIdAndUpdate(
      checkEmailExist.id,
      updateParam,
      {
        new: true,
      }
    );

    return updateUser;
  }
}
