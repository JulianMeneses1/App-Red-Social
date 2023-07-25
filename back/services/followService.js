const Follow = require("../models/Follow");

// Función para obtener los ids de todos los seguidores y seguidos de un usuario
const followUserIds = async (identityUserId)=> {
    try {
        const following = await Follow.find({ "user": identityUserId})
            .select({ "followed": 1, "_id": 0})
            .exec();

        let followingClean = [];
        following.forEach(follow => {
            followingClean.push(follow.followed)
        });

        const followers = await Follow.find({ "followed": identityUserId})
            .select({ "user": 1, "_id": 0})
            .exec();
     
        let followersClean = [];
        followers.forEach(follower => {
            followersClean.push(follower.user)
        })
        return {
            following: followingClean,
            followers: followersClean
        }
    } catch (error) {
        return {};
    }
}


// Función para ver si un usuario me sigue y si lo sigo
const followThisUser = async(identityUserId, profileUserId) => {
    let following = await Follow.findOne({"user": identityUserId, "followed": profileUserId});
    let follower = await Follow.findOne({"user": profileUserId, "followed": identityUserId});
    return {
        following,
        follower
    }
}

module.exports = {
    followThisUser,
    followUserIds
}