class UserDto {
    id;
    name;
    aadharNumber;
    verified;
    createdAt;

    constructor(user) {
        this.id = user._id;
        this.name = user.name;
        this.aadharNumber = user.aadharNumber;
        this.verified = user.verified;
        this.createdAt = user.createdAt;
    }
}


module.exports = UserDto;