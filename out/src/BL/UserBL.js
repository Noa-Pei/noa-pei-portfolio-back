"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBL = void 0;
class UserBL {
    constructor(userDataAccess) {
        this.userDataAccess = userDataAccess;
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userDataAccess.add(user);
            }
            catch (error) {
                throw new Error(`Unable to add User: ${error.message}`);
            }
        });
    }
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Post = yield this.userDataAccess.get(userId);
            if (!Post) {
                throw new Error(`User with ID ${userId} not found`);
            }
            return Post;
        });
    }
    updateUser(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userDataAccess.update(userId, updateData);
            }
            catch (error) {
                throw new Error(`Unable to update User: ${error.message}`);
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userDataAccess.delete(userId);
            }
            catch (error) {
                throw new Error(`Unable to delete User: ${error.message}`);
            }
        });
    }
}
exports.UserBL = UserBL;
