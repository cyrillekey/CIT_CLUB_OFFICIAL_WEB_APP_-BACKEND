/**
 * Application module dependencies
 */
const bcrypt = require ( 'bcrypt');
const Joi = require ( 'joi');
/**
 * Module internal dependencies
 */
const { CitclubMember: Member } = require ( '../database/index');

// Join CIT CLUB FUNCTION
const joinCitClub = (req, res) => {
    const {email,
           fname,
           lname,
           phone,
           course,
           rating,
           designRating,
           interest,
           password, 
           other,
                } = req.body;
    //Joining first name and last name
    let name = `${fname} ${lname}`;
    let phonenumber;
    phone.length === 12 ?
    phonenumber = phone : 
    phonenumber = `254${phone.slice (1, phone.length)}`
    //Validation user input
    const userInput = Joi.object ( {
        email
    })
    // Hashing password
    bcrypt.hash ( password, 12)
    .then ( (hashsalt) => {
        let passwordHash = hashsalt;

        let newMember = new Member ( {
            email: email,
            name: name,
            phonenumber: phonenumber,
            course: course,
            programingRating: rating,
            designRating: designRating,
            fieldOfInterest: interest,
            password: passwordHash,
            additionalInfo:other,
        });
        // TODO: this
        // Save the new Member to the database
        newMember.save ()
        .then ( (member) => {
            res
            .status (201)
            .json ( {
                message: `Member with username ${member.email} has been created successfully`,
                phonenumber: member.phonenumber,
                id: member._id
            });
        })
        .catch ( (err) => {
            res
            .status (500)
            .json ( {
                err:err.message
            })
        });
    })
    .catch ( (err) => {
        res
        .status (500)
        .json (err.message);
    });
};

// EXPORT JOIN CIT CLUB FUNCTION
module.exports = joinCitClub;