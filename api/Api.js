/*
* Name : Api.js
*
* Version : 2.0.0
*
* Authors : GUMBAU Elric, LEMOINE Kaunogan
*/

//Imports
var needle = require('needle');

//Class
class Api {

    //Constructor
    constructor() {
        this.token = null;
        this.userId = null;
        this.username = null;
        this.bio = null;
        this.userCreatedAt = null;
        this.userCreatedAtHour = null;
        this.numberOfFollowUser = null;
        this.idArticle = null;
        this.articleFollowCommentCreatedAt = [];
        this.articleFollowCreatedAt = [];
        this.connectedUserArticleCreatedAt = [];
        this.connectedUserArticleCommentCreatedAt = [];
        this.allUserCreatedAt = [];
        this.followUserCreatedAt = [];
        this.jsonFollowUserId = [];
        this.jsonUserArticle = [];
        this.jsonFollowArticle = [];
        this.jsonArticleComment = [];
        this.jsonInfoFollowArticle = [];
        this.jsonArticleGuest = [];
    }

    // Function 'signin()'
    signin(signin_email, signin_password, _res) {

        // We use our API allowing the user to log in and generate a 1h token
        needle.post('http://localhost:8080/api/users/login',
            {
                email: signin_email, //We pass in parameter to our route the email
                password: signin_password // We pass in parameter to our route the password

            }, (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    this.token = res.body.token;
                    this.userId = res.body.userId;
                }

                //Verifications
                if (this.token == undefined || this.userId == undefined) {
                    _res.redirect('/');// We redirect the user to login blog page 
                }
                else {

                    //Dsiplay in console the userId and the token associated with it
                    console.log(`\n User ${this.userId} connected with token : ${this.token} !\n`);

                    // We get the user information
                    this.getConnectedUserInfo(this.token, _res);
                }
            });
    }

    // Function 'register()'
    register(register_email, register_username, register_password, register_bio, _res) {

        // We use our API allows the user to register
        needle.post('http://localhost:8080/api/users/register',
            {
                email: register_email, // We pass in parameter to our route the email
                username: register_username, // We pass in parameter to our route the username
                password: register_password, // We pass in parameter to our route the password
                bio: register_bio, // We pass in parameter to our route the biography

            }, (err, res) => {
                if (err) {
                    console.log(err);
                } else {

                    //Verification
                    switch (res.body.error) {

                        case "email is not valid":
                            console.log(res.body.error);
                            break;

                        case "wrong username (must be length 5 -12)":
                            console.log(res.body.error);
                            break;

                        case "password invalid (must length 4 - 8 and include 1 number)":
                            console.log(res.body.error);
                            break;

                        default:
                            // Get function 'signin()'
                            this.signin(register_email, register_password, _res);
                            break;
                    }
                }
            });
    }

    // Function 'getInfoUser()'
    getConnectedUserInfo(token, _res) {

        const _token = 'Bearer ' + token;

        // We use our API to get info User
        needle.get('http://localhost:8080/api/users/me',
            {
                headers: {
                    'Authorization': _token,
                }

            }, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    //Check if the token is valid
                    if (res.body.error == "wrong token") {
                        console.log(`Token of userId ${this.userId} expired, redirect to login`);
                        this.token = null;
                        this.userId = null;
                        this.username = null;
                        this.bio = null;
                        this.userCreatedAt = null;
                        this.userCreatedAtHour = null;
                        this.numberOfFollowUser = null;
                        this.idArticle = null;
                        this.articleFollowCommentCreatedAt = [];
                        this.articleFollowCreatedAt = [];
                        this.connectedUserArticleCreatedAt = [];
                        this.connectedUserArticleCommentCreatedAt = [];
                        this.allUserCreatedAt = [];
                        this.followUserCreatedAt = [];
                        this.jsonFollowUserId = [];
                        this.jsonUserArticle = [];
                        this.jsonFollowArticle = [];
                        this.jsonArticleComment = [];
                        _res.redirect('/'); // Redirect to login
                    } else {

                        var date = [];
                        var hour = [];

                        // Get the username and bio of the user
                        this.username = res.body.username;
                        this.bio = res.body.bio;

                        //Get registration of the user
                        date = res.body.createdAt.split("T");
                        this.userCreatedAtDate = date[0];

                        hour = date[1].split(".");
                        this.userCreatedAtHour = hour[0];

                        if (res.body.followUserId == null || res.body.followUserId == 'NULL') {
                            this.jsonFollowUserId = [];
                        } else {
                            // we recover the old data by split with ,
                            this.jsonFollowUserId = res.body.followUserId.split(',');
                        }

                        //Redirect
                        this.getArticleFollow(token, _res);
                    }
                }
            });
    }

    // Function 'getAllUserInfo()'
    getAllUserInfo(token, _res) {

        const _token = 'Bearer ' + token;

        // We use our API to get info of All User of the Blog
        needle.get('http://localhost:8080/api/users/all',
            {
                headers: {
                    'Authorization': _token,
                }

            }, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    //Check if the token is valid
                    if (res.body.error == "wrong token") {
                        console.log(`Token of userId ${this.userId} expired, redirect to login`);
                        this.token = null;
                        this.userId = null;
                        this.username = null;
                        this.bio = null;
                        this.userCreatedAt = null;
                        this.userCreatedAtHour = null;
                        this.numberOfFollowUser = null;
                        this.idArticle = null;
                        this.articleFollowCommentCreatedAt = [];
                        this.articleFollowCreatedAt = [];
                        this.connectedUserArticleCreatedAt = [];
                        this.connectedUserArticleCommentCreatedAt = [];
                        this.allUserCreatedAt = [];
                        this.followUserCreatedAt = [];
                        this.jsonFollowUserId = [];
                        this.jsonUserArticle = [];
                        this.jsonFollowArticle = [];
                        this.jsonArticleComment = [];
                        _res.redirect('/'); // Redirect to login
                    } else {

                        //Create table that containt all id of the users without the id of user connected
                        var arrayOfId = [];
                        var date = [];

                        // Insert into the table 'arrayOfId'
                        for (var i = 0; i < res.body.length; i++) {
                            if (this.userId != res.body[i].id) {
                                arrayOfId.push(res.body[i].id);
                            }
                        }

                        // Delete the all id that the person follow
                        for (var i = 0; i < this.jsonFollowUserId.length; i++) {
                            if (arrayOfId.includes(parseInt(this.jsonFollowUserId[i]))) {
                                var id = parseInt(this.jsonFollowUserId[i]);
                                var index = arrayOfId.indexOf(id);
                                arrayOfId.splice(index, 1);
                            }
                        }

                        //Push into the table 'jsonAllUser' that containt all the information of the people that the user does not follow
                        for (var i = 0; i < res.body.length; i++) {
                            for (var j = 0; j < arrayOfId.length; j++) {
                                // Check if the UserId that person doesn't follow is not NULL
                                if (this.jsonFollowUserId[j] != "NULL") {
                                    var id = parseInt(arrayOfId[j]);
                                    if (id == res.body[i].id) {
                                        this.jsonAllUser.push({
                                            id: res.body[i].id,
                                            username: res.body[i].username,
                                            bio: res.body[i].bio,
                                        })

                                        date = res.body[i].createdAt.split('T');
                                        this.allUserCreatedAt.push({
                                            date: date[0],
                                        })

                                    }
                                }
                            }
                        }

                        // Redirect
                        _res.redirect('/blogYnov/userconnected/follow');
                    }
                }
            });
    }

    // Function 'getFollowUserInfo()'
    getFollowUserInfo(token, _res) {

        const _token = 'Bearer ' + token;

        // We use our API to get info of All User of the Blog
        needle.get('http://localhost:8080/api/users/all',
            {
                headers: {
                    'Authorization': _token,
                }

            }, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    //Check if the token is valid
                    if (res.body.error == "wrong token") {
                        console.log(`Token of userId ${this.userId} expired, redirect to login`);
                        this.token = null;
                        this.userId = null;
                        this.username = null;
                        this.bio = null;
                        this.userCreatedAt = null;
                        this.userCreatedAtHour = null;
                        this.numberOfFollowUser = null;
                        this.idArticle = null;
                        this.articleFollowCommentCreatedAt = [];
                        this.articleFollowCreatedAt = [];
                        this.connectedUserArticleCreatedAt = [];
                        this.connectedUserArticleCommentCreatedAt = [];
                        this.allUserCreatedAt = [];
                        this.followUserCreatedAt = [];
                        this.jsonFollowUserId = [];
                        this.jsonUserArticle = [];
                        this.jsonFollowArticle = [];
                        this.jsonArticleComment = [];
                        _res.redirect('/'); // Redirect to login
                    } else {

                        var date = [];

                        //Push into the table 'jsonAllUser' that containt all the information of the people that the user follow
                        for (var i = 0; i < res.body.length; i++) {
                            for (var j = 0; j < this.jsonFollowUserId.length; j++) {
                                // Check if the UserId that person follow is not NULL
                                if (this.jsonFollowUserId[j] != "NULL") {
                                    var id = parseInt(this.jsonFollowUserId[j]);
                                    if (id == res.body[i].id) {
                                        this.jsonAllUser.push({
                                            id: res.body[i].id,
                                            username: res.body[i].username,
                                            bio: res.body[i].bio,
                                        })

                                        date = res.body[i].createdAt.split('T');
                                        this.followUserCreatedAt.push({
                                            date: date[0],
                                        })
                                    }
                                }
                            }
                        }

                        // Redirect
                        _res.redirect('/blogYnov/userconnected/followuser');
                    }
                }
            });
    }

    // Function 'followUser()'
    followUser(token, _res, newfollowUserId) {

        const _token = 'Bearer ' + token;

        var updateFollowUserId;

        // Push the new follow user id into the array
        this.jsonFollowUserId.push(newfollowUserId);

        //Get all id that user follow
        updateFollowUserId = this.jsonFollowUserId.join();

        // We use our API to update the users that the person follows
        needle.put('http://localhost:8080/api/users/me',
            {
                followUserId: updateFollowUserId,
            },
            {
                headers: {
                    'Authorization': _token,
                }
            }, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    //Check if the token is valid
                    if (res.body.error == "wrong token") {
                        console.log(`Token of userId ${this.userId} expired, redirect to login`);
                        this.token = null;
                        this.userId = null;
                        this.username = null;
                        this.bio = null;
                        this.userCreatedAt = null;
                        this.userCreatedAtHour = null;
                        this.numberOfFollowUser = null;
                        this.idArticle = null;
                        this.articleFollowCommentCreatedAt = [];
                        this.articleFollowCreatedAt = [];
                        this.connectedUserArticleCreatedAt = [];
                        this.connectedUserArticleCommentCreatedAt = [];
                        this.allUserCreatedAt = [];
                        this.followUserCreatedAt = [];
                        this.jsonFollowUserId = [];
                        this.jsonUserArticle = [];
                        this.jsonFollowArticle = [];
                        this.jsonArticleComment = [];
                        _res.redirect('/'); // Redirect to login
                    } else {
                        console.log(`User ${this.getUserId} follow User ${res.body.followUserId}`);
                        this.getAllUserInfo(token, _res);
                    }
                }
            });
    }

    // Function 'disfollowUser()'
    disfollowUser(token, _res, deletefollowUserId) {

        const _token = 'Bearer ' + token;

        var updateFollowUserId;

        console.log(deletefollowUserId);

        // Splice the id of users that we do not want to delete
        for (var i = 0; i < this.jsonFollowUserId.length; i++) {
            var id = parseInt(this.jsonFollowUserId[i]);

            if ((this.jsonFollowUserId.includes(deletefollowUserId))) {
                if (id == deletefollowUserId) {

                    var index = this.jsonFollowUserId[i].indexOf(id);
                    this.jsonFollowUserId.splice(index, 1);
                }
            }
        }

        //Check if length of array 'jsonFollowUserId' equal to 0
        if (this.jsonFollowUserId.length == 0) {
            updateFollowUserId = "NULL";
        } else {
            updateFollowUserId = this.jsonFollowUserId.join();
        }

        // We use our API to update the users that the connected person follows
        needle.put('http://localhost:8080/api/users/me',
            {
                followUserId: updateFollowUserId,
            },
            {
                headers: {
                    'Authorization': _token,
                }
            }, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    //Check if the token is valid
                    if (res.body.error == "wrong token") {
                        console.log(`Token of userId ${this.userId} expired, redirect to login`);
                        this.token = null;
                        this.userId = null;
                        this.username = null;
                        this.bio = null;
                        this.userCreatedAt = null;
                        this.userCreatedAtHour = null;
                        this.numberOfFollowUser = null;
                        this.idArticle = null;
                        this.articleFollowCommentCreatedAt = [];
                        this.articleFollowCreatedAt = [];
                        this.connectedUserArticleCreatedAt = [];
                        this.connectedUserArticleCommentCreatedAt = [];
                        this.allUserCreatedAt = [];
                        this.followUserCreatedAt = [];
                        this.jsonFollowUserId = [];
                        this.jsonUserArticle = [];
                        this.jsonFollowArticle = [];
                        this.jsonArticleComment = [];
                        _res.redirect('/'); // Redirect to login
                    } else {
                        console.log(`User ${this.getUserId} follow User ${res.body.followUserId}`);
                        this.getFollowUserInfo(token, _res);
                    }
                }
            });
    }

    getGuestArticle(_res) {
        // We use our API to update the users that the connected person follows
        needle.get('http://localhost:8080/api/articles/guest/',
            {

            }, (err, res) => {
                if (err) {
                    console.log(err);
                } else {

                    console.log(`Guest Connected`);

                    this.jsonArticleGuest = [];
                    this.connectedUserArticleCreatedAt = [];

                    var date = null;
                    var hour = null;

                    for (var i = 0; i < res.body.length; i++) {
                        this.jsonArticleGuest.push({
                            title: res.body[i].title,
                            content: res.body[i].content,
                            username: res.body[i].User.username,
                        })

                        date = res.body[i].createdAt.split('T');
                        hour = date[1].split('.');

                        this.connectedUserArticleCreatedAt.push({
                            date: date[0],
                            hour: hour[0]
                        })
                    }
                    _res.redirect('/blogYnov/guest');
                }
            });
    }

    //Function 'getConnectedUserArticle()'
    getConnectedUserArticle(token, _res) {

        const _token = 'Bearer ' + token;

        //Reset 'jsonUserArticle'
        this.jsonUserArticle = [];

        // We use our API to get article of the connected user
        needle.get('http://localhost:8080/api/articles/',
            {
                headers: {
                    'Authorization': _token,
                }

            }, (err, res) => {
                if (err) {
                    console.log(err)
                }
                else {
                    //Check if the token is valid
                    if (res.body.error == "wrong token") {
                        console.log(`Token of userId ${this.userId} expired, redirect to login`);
                        this.token = null;
                        this.userId = null;
                        this.username = null;
                        this.bio = null;
                        this.userCreatedAt = null;
                        this.userCreatedAtHour = null;
                        this.numberOfFollowUser = null;
                        this.idArticle = null;
                        this.articleFollowCommentCreatedAt = [];
                        this.articleFollowCreatedAt = [];
                        this.connectedUserArticleCreatedAt = [];
                        this.connectedUserArticleCommentCreatedAt = [];
                        this.allUserCreatedAt = [];
                        this.followUserCreatedAt = [];
                        this.jsonFollowUserId = [];
                        this.jsonUserArticle = [];
                        this.jsonFollowArticle = [];
                        this.jsonArticleComment = [];
                        _res.redirect('/'); // Redirect to login
                    } else {


                        var arrayOfIdArticle = [];
                        var date = [];
                        var hour = [];
                        this.connectedUserArticleCreatedAt = [];

                        for (var i = 0; i < res.body.length; i++) {
                            if (this.userId == res.body[i].UserId) {
                                this.jsonUserArticle.push({
                                    id: res.body[i].id,
                                    title: res.body[i].title,
                                    content: res.body[i].content,
                                })

                                arrayOfIdArticle.push(res.body[i].id);

                                date = res.body[i].createdAt.split('T');
                                hour = date[1].split('.');

                                this.connectedUserArticleCreatedAt.push({
                                    date: date[0],
                                    hour: hour[0]
                                })
                            }
                        }
                        this.getConnectedUserArticleComment(token, _res, arrayOfIdArticle);
                    }
                }
            })
    }

    //Function 'getArticleFollow()'
    getArticleFollow(token, _res) {

        const _token = 'Bearer ' + token;

        //Reset 'jsonFollowArticle'
        this.jsonFollowArticle = [];

        // We use our API to get article of the connected user
        needle.get('http://localhost:8080/api/articles/',
            {
                headers: {
                    'Authorization': _token,
                }

            }, (err, res) => {
                if (err) {
                    console.log(err)
                }
                else {
                    //Check if the token is valid
                    if (res.body.error == "wrong token") {
                        console.log(`Token of userId ${this.userId} expired, redirect to login`);
                        this.token = null;
                        this.userId = null;
                        this.username = null;
                        this.bio = null;
                        this.userCreatedAt = null;
                        this.userCreatedAtHour = null;
                        this.numberOfFollowUser = null;
                        this.idArticle = null;
                        this.articleFollowCommentCreatedAt = [];
                        this.articleFollowCreatedAt = [];
                        this.connectedUserArticleCreatedAt = [];
                        this.connectedUserArticleCommentCreatedAt = [];
                        this.allUserCreatedAt = [];
                        this.followUserCreatedAt = [];
                        this.jsonFollowUserId = [];
                        this.jsonUserArticle = [];
                        this.jsonFollowArticle = [];
                        this.jsonArticleComment = [];
                        _res.redirect('/'); // Redirect to login
                    } else {

                        this.numberOfFollowUser = this.jsonFollowUserId.length;
                        var arrayOfIdArticle = [];
                        var date = [];
                        var hour = [];

                        for (var i = 0; i < this.jsonFollowUserId.length; i++) {
                            for (var j = 0; j < res.body.length; j++) {
                                if (this.jsonFollowUserId[i] == res.body[j].UserId) {
                                    this.jsonFollowArticle.push({
                                        id: res.body[j].id,
                                        title: res.body[j].title,
                                        content: res.body[j].content,
                                        User: res.body[j].User.username
                                    })

                                    date = res.body[j].createdAt.split('T');
                                    hour = date[1].split('.');

                                    this.articleFollowCreatedAt.push({
                                        date: date[0],
                                        hour: hour[0]
                                    })

                                    arrayOfIdArticle.push(res.body[j].id);
                                }
                            }
                        }
                        //Redirect
                        _res.redirect('/blogYnov/userconnected/');
                    }
                }
            })
    }

    //Function 'addArticle()'
    addArticle(token, _res, title, content) {

        const _token = 'Bearer ' + token;

        const arrayContent = content.split("\r\n");

        for (var i = 0; i < arrayContent.length; i++) {
            if (i != 0) {
                arrayContent[i] = "\\n" + arrayContent[i];
            }
        }

        content = arrayContent.join('');

        // We use our API to get article of the connected user
        needle.post('http://localhost:8080/api/articles/new/',
            {
                title: title,
                content: content
            },
            {
                headers: {
                    'Authorization': _token,
                }
            }, (err, res) => {
                if (err) {
                    console.log(err)
                }
                else {
                    //Check if the token is valid
                    if (res.body.error == "wrong token") {
                        console.log(`Token of userId ${this.userId} expired, redirect to login`);
                        this.token = null;
                        this.userId = null;
                        this.username = null;
                        this.bio = null;
                        this.userCreatedAt = null;
                        this.userCreatedAtHour = null;
                        this.numberOfFollowUser = null;
                        this.idArticle = null;
                        this.articleFollowCommentCreatedAt = [];
                        this.articleFollowCreatedAt = [];
                        this.connectedUserArticleCreatedAt = [];
                        this.connectedUserArticleCommentCreatedAt = [];
                        this.allUserCreatedAt = [];
                        this.followUserCreatedAt = [];
                        this.jsonFollowUserId = [];
                        this.jsonUserArticle = [];
                        this.jsonFollowArticle = [];
                        this.jsonArticleComment = [];
                        _res.redirect('/'); // Redirect to login
                    } else {
                        this.getConnectedUserArticle(token, _res);
                    }
                }
            })
    }

    //Function 'updateArticle()'
    updateArticle(token, _res, id, title, content) {

        const _token = 'Bearer ' + token;

        const arrayContent = content.split("\r\n");

        for (var i = 0; i < arrayContent.length; i++) {
            if (i != 0) {
                arrayContent[i] = "\\n" + arrayContent[i];
            }
        }

        content = arrayContent.join('');

        // We use our API to get article of the connected user
        needle.put('http://localhost:8080/api/articles/update/',
            {
                articleId: id,
                title: title,
                content: content,
            },
            {
                headers: {
                    'Authorization': _token,
                }
            }, (err, res) => {
                if (err) {
                    console.log(err)
                }
                else {
                    //Check if the token is valid
                    if (res.body.error == "wrong token") {
                        console.log(`Token of userId ${this.userId} expired, redirect to login`);
                        this.token = null;
                        this.userId = null;
                        this.username = null;
                        this.bio = null;
                        this.userCreatedAt = null;
                        this.userCreatedAtHour = null;
                        this.numberOfFollowUser = null;
                        this.idArticle = null;
                        this.articleFollowCommentCreatedAt = [];
                        this.articleFollowCreatedAt = [];
                        this.connectedUserArticleCreatedAt = [];
                        this.connectedUserArticleCommentCreatedAt = [];
                        this.allUserCreatedAt = [];
                        this.followUserCreatedAt = [];
                        this.jsonFollowUserId = [];
                        this.jsonUserArticle = [];
                        this.jsonFollowArticle = [];
                        this.jsonArticleComment = [];
                        _res.redirect('/'); // Redirect to login
                    } else {
                        //Get all articles with new udpate
                        this.getConnectedUserArticle(token, _res);
                    }
                }
            })
    }

    //Function 'deleteArticle()'
    deleteArticle(token, _res, id) {

        const _token = 'Bearer ' + token;

        // We use our API to get article of the connected user
        needle.delete('http://localhost:8080/api/articles/delete/',
            {
                articleId: id,
            },
            {
                headers: {
                    'Authorization': _token,
                }
            }, (err, res) => {
                if (err) {
                    console.log(err)
                }
                else {
                    //Check if the token is valid
                    if (res.body.error == "wrong token") {
                        console.log(`Token of userId ${this.userId} expired, redirect to login`);
                        this.token = null;
                        this.userId = null;
                        this.username = null;
                        this.bio = null;
                        this.userCreatedAt = null;
                        this.userCreatedAtHour = null;
                        this.numberOfFollowUser = null;
                        this.idArticle = null;
                        this.articleFollowCommentCreatedAt = [];
                        this.articleFollowCreatedAt = [];
                        this.connectedUserArticleCreatedAt = [];
                        this.connectedUserArticleCommentCreatedAt = [];
                        this.allUserCreatedAt = [];
                        this.followUserCreatedAt = [];
                        this.jsonFollowUserId = [];
                        this.jsonUserArticle = [];
                        this.jsonFollowArticle = [];
                        this.jsonArticleComment = [];
                        _res.redirect('/'); // Redirect to login
                    } else {
                        //Get article of the connected user
                        this.getConnectedUserArticle(token, _res);
                    }
                }
            })
    }

    //Function 'getArticleComment()'
    getFollowArticleComment(token, _res, id, jsonInfoFollowArticle) {

        const _token = 'Bearer ' + token;

        this.jsonInfoFollowArticle = jsonInfoFollowArticle;

        // We use our API to list articles 
        needle.get('http://localhost:8080/api/articles/comments/',
            {
                headers: {
                    'Authorization': _token,
                }
            }, (err, res) => {
                if (err) {
                    console.log(err)
                }
                else {
                    //Check if the token is valid
                    if (res.body.error == "wrong token") {
                        console.log(`Token of userId ${this.userId} expired, redirect to login`);
                        this.token = null;
                        this.userId = null;
                        this.username = null;
                        this.bio = null;
                        this.userCreatedAt = null;
                        this.userCreatedAtHour = null;
                        this.numberOfFollowUser = null;
                        this.idArticle = null;
                        this.articleFollowCommentCreatedAt = [];
                        this.articleFollowCreatedAt = [];
                        this.connectedUserArticleCreatedAt = [];
                        this.connectedUserArticleCommentCreatedAt = [];
                        this.allUserCreatedAt = [];
                        this.followUserCreatedAt = [];
                        this.jsonFollowUserId = [];
                        this.jsonUserArticle = [];
                        this.jsonFollowArticle = [];
                        this.jsonArticleComment = [];
                        _res.redirect('/'); // Redirect to login
                    } else {
                        this.jsonArticleComment = [];
                        var date = [];
                        var hour = [];

                        for (let j = 0; j < res.body.length; j++) {
                            if (id == res.body[j].articleId) {
                                this.jsonArticleComment.push({
                                    username: res.body[j].User.username,
                                    comment: res.body[j].comment,
                                    articleId: res.body[j].articleId,

                                })

                                date = res.body[j].createdAt.split('T');
                                hour = date[1].split('.');

                                this.articleFollowCommentCreatedAt.push({
                                    date: date[0],
                                    hour: hour[0]
                                })
                            }
                        }
                        _res.redirect('/blogYnov/userconnected/articles/readmore');
                    }
                }
            })
    }

    //Function 'getConnectedUserArticleComment()'
    getConnectedUserArticleComment(token, _res, arrayOfIdArticle) {

        const _token = 'Bearer ' + token;

        // We use our API to list articles 
        needle.get('http://localhost:8080/api/articles/comments/',
            {
                headers: {
                    'Authorization': _token,
                }
            }, (err, res) => {
                if (err) {
                    console.log(err)
                }
                else {
                    //Check if the token is valid
                    if (res.body.error == "wrong token") {
                        console.log(`Token of userId ${this.userId} expired, redirect to login`);
                        this.token = null;
                        this.userId = null;
                        this.username = null;
                        this.bio = null;
                        this.userCreatedAt = null;
                        this.userCreatedAtHour = null;
                        this.numberOfFollowUser = null;
                        this.idArticle = null;
                        this.articleFollowCommentCreatedAt = [];
                        this.articleFollowCreatedAt = [];
                        this.connectedUserArticleCreatedAt = [];
                        this.connectedUserArticleCommentCreatedAt = [];
                        this.allUserCreatedAt = [];
                        this.followUserCreatedAt = [];
                        this.jsonFollowUserId = [];
                        this.jsonUserArticle = [];
                        this.jsonFollowArticle = [];
                        this.jsonArticleComment = [];
                        _res.redirect('/'); // Redirect to login
                    } else {
                        this.jsonArticleComment = [];
                        var date = [];
                        var hour = [];

                        for (var i = 0; i < arrayOfIdArticle.length; i++) {
                            for (let j = 0; j < res.body.length; j++) {
                                if (arrayOfIdArticle[i] == res.body[j].articleId) {
                                    this.jsonArticleComment.push({
                                        createdAt: res.body[j].createdAt,
                                        username: res.body[j].User.username,
                                        comment: res.body[j].comment,
                                        articleId: res.body[j].articleId
                                    })

                                    date = res.body[j].createdAt.split('T');
                                    hour = date[1].split('.');

                                    this.connectedUserArticleCommentCreatedAt.push({
                                        date: date[0],
                                        hour: hour[0]
                                    })
                                }
                            }
                        }
                        //Redirect
                        _res.redirect('/blogYnov/userconnected/myarticles')
                    }
                }
            })
    }

    //Function 'addComment()'
    addComment(token, _res, id, comment) {

        const _token = 'Bearer ' + token;

        // We use our API to comment article
        needle.post('http://localhost:8080/api/articles/comments/new/',
            {
                articleId: id,
                comment: comment,
            },
            {
                headers: {
                    'Authorization': _token,
                }
            }, (err, res) => {
                if (err) {
                    console.log(err)
                }
                else {
                    //Check if the token is valid
                    if (res.body.error == "wrong token") {
                        console.log(`Token of userId ${this.userId} expired, redirect to login`);
                        this.token = null;
                        this.userId = null;
                        this.username = null;
                        this.bio = null;
                        this.userCreatedAt = null;
                        this.userCreatedAtHour = null;
                        this.numberOfFollowUser = null;
                        this.idArticle = null;
                        this.articleFollowCommentCreatedAt = [];
                        this.articleFollowCreatedAt = [];
                        this.connectedUserArticleCreatedAt = [];
                        this.connectedUserArticleCommentCreatedAt = [];
                        this.allUserCreatedAt = [];
                        this.followUserCreatedAt = [];
                        this.jsonFollowUserId = [];
                        this.jsonUserArticle = [];
                        this.jsonFollowArticle = [];
                        this.jsonArticleComment = [];
                        _res.redirect('/'); // Redirect to login
                    } else {
                        this.getFollowArticleComment(token, _res, id, this.getjsonInfoFollowArticle);
                    }
                }
            })
    }

    //Function 'deleteAllComment()'
    deleteAllComments(token, _res, id) {

        const _token = 'Bearer ' + token;

        // We use our API to get article of the connected user
        needle.delete('http://localhost:8080/api/articles/comments/delete/all',
            {
                articleId: id,
            },
            {
                headers: {
                    'Authorization': _token,
                }
            }, (err, res) => {
                if (err) {
                    console.log(err)
                }
                else {
                    //Check if the token is valid
                    if (res.body.error == "wrong token") {
                        console.log(`Token of userId ${this.userId} expired, redirect to login`);
                        this.token = null;
                        this.userId = null;
                        this.username = null;
                        this.bio = null;
                        this.userCreatedAt = null;
                        this.userCreatedAtHour = null;
                        this.numberOfFollowUser = null;
                        this.idArticle = null;
                        this.articleFollowCommentCreatedAt = [];
                        this.articleFollowCreatedAt = [];
                        this.connectedUserArticleCreatedAt = [];
                        this.connectedUserArticleCommentCreatedAt = [];
                        this.allUserCreatedAt = [];
                        this.followUserCreatedAt = [];
                        this.jsonFollowUserId = [];
                        this.jsonUserArticle = [];
                        this.jsonFollowArticle = [];
                        this.jsonArticleComment = [];
                        _res.redirect('/'); // Redirect to login
                    } else {
                        //Deleta related article
                        this.deleteArticle(token, _res, id);
                    }
                }
            })
    }

    // Function 'getToken()'
    get getToken() {
        return this.token; // Return the token of the user
    }

    // Function 'getUserId()'
    get getUserId() {
        return this.userId // Return the userId of the user
    }

    // Function 'getUserName()'
    get getUserName() {
        return this.username;
    }

    // Function 'getBio()'
    get getBio() {
        return this.bio;
    }

    // Function 'getUserCreatedAtDate()'
    get getUserCreatedAtDate() {
        return this.userCreatedAtDate;
    }

    // Function 'userCreatedAtHour()'
    get getUserCreatedAtHour() {
        return this.userCreatedAtHour;
    }

    // Function 'getnumberOfFollowUser()'
    get getnumberOfFollowUser() {
        return this.numberOfFollowUser;
    }

    // Function 'getJsonAllUser()'
    get getjsonAllUser() {
        return this.jsonAllUser;
    }

    // Function 'getjsonUserArticle()'
    get getjsonUserArticle() {
        return this.jsonUserArticle;
    }

    // Function 'getjsonFollowArticle()'
    get getjsonFollowArticle() {
        return this.jsonFollowArticle;
    }

    // Function 'getIdArticle()'
    get getIdArticle() {
        return this.idArticle;
    }

    // Function 'getJsonArticleComment()'
    get getJsonArticleComment() {
        return this.jsonArticleComment;
    }

    // Function 'getArticleFollowCommentCreatedAt()'
    get getArticleFollowCommentCreatedAt() {
        return this.articleFollowCommentCreatedAt;
    }

    // Function 'getArticleFollowCreatedAt()'
    get getArticleFollowCreatedAt() {
        return this.articleFollowCreatedAt;
    }

    // Function 'getConnectedUserArticleCreatedAt()'
    get getConnectedUserArticleCreatedAt() {
        return this.connectedUserArticleCreatedAt;
    }

    // Function 'getConnectedUserArticleCommentCreatedAt()'
    get getConnectedUserArticleCommentCreatedAt() {
        return this.connectedUserArticleCommentCreatedAt;
    }

    // Function 'getAllUserCreatedAt()'
    get getAllUserCreatedAt() {
        return this.allUserCreatedAt;
    }

    // Function 'getFollowUserCreatedAt()'
    get getFollowUserCreatedAt() {
        return this.followUserCreatedAt;
    }

    // Function 'getjsonInfoFollowArticle()'
    get getjsonInfoFollowArticle() {
        return this.jsonInfoFollowArticle;
    }

    // Function 'getjsonArticleGuest()'
    get getjsonArticleGuest() {
        return this.jsonArticleGuest;
    }

    // Function 'setToken()'
    set setToken(token) {
        this.token = token;
    }

    // Function 'setUserId()'
    set setUserId(userId) {
        this.userId = userId;
    }

    // Function 'setUserCreatedAtDate()'
    set setUserCreatedAtDate(userCreatedAtDate) {
        this.userCreatedAtDate = userCreatedAtDate;
    }

    // Function 'setUserCreatedAtHour()'
    set setUserCreatedAtHour(userCreatedAtHour) {
        this.userCreatedAtHour = userCreatedAtHour;
    }

    // Function 'setnumberOfFollowUser()'
    set setnumberOfFollowUser(numberOfFollowUser) {
        this.numberOfFollowUser = numberOfFollowUser;
    }

    // Function 'setIdArticle()'
    set setIdArticle(idarticle) {
        this.idArticle = idarticle;
    }

    // Function 'setArticleFollowCreatedAt()'
    set setArticleFollowCreatedAt(articleFollowCreatedAt) {
        this.articleFollowCreatedAt = articleFollowCreatedAt;
    }

    // Function 'setArticleFollowCreatedAt()'
    set setArticleFollowCommentCreatedAt(articleFollowCommentCreatedAt) {
        this.articleFollowCommentCreatedAt = articleFollowCommentCreatedAt;
    }

    // Function 'setConnectedUserArticleCreatedAt()'
    set setConnectedUserArticleCreatedAt(connectedUserArticleCreatedAt) {
        this.connectedUserArticleCreatedAt = connectedUserArticleCreatedAt;
    }

    // Function 'setConnectedUserArticleCommentCreatedAt()'
    set setConnectedUserArticleCommentCreatedAt(connectedUserArticleCommentCreatedAt) {
        this.connectedUserArticleCommentCreatedAt = connectedUserArticleCommentCreatedAt;
    }

    // Function 'setAllUserCreatedAt()'
    set setAllUserCreatedAt(allUserCreatedAt) {
        this.allUserCreatedAt = allUserCreatedAt;
    }

    // Function 'getFollowUserCreatedAt()'
    set setFollowUserCreatedAt(followUserCreatedAt) {
        this.followUserCreatedAt = followUserCreatedAt;
    }

    // Function 'resetjsonAllUser()'
    resetjsonAllUser() {
        this.jsonAllUser = [];
    }
}

module.exports = Api;