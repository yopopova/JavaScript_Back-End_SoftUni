const Course = require('../models/Course');

exports.create = (courseData) => Course.create(courseData);

exports.getAll = () => Course.find();

exports.getSingleCourse = (courseId) => Course.findById(courseId);

exports.update = (courseId, courseData) => Course.findByIdAndUpdate(courseId, courseData);

exports.delete = (courseId) => Course.findByIdAndDelete(courseId);

exports.getMyCourses = (ownerId) => Course.find({ owner: ownerId }); // Here we can use .populate('owner')

exports.addSignUpsToCourse = async (courseId, userId) => {
    const course = await this.getSingleCourse(courseId);

    const isExistingInSignUps = course.signUpList.some((sign) => sign?.toString() === userId);

    if (isExistingInSignUps) {
        return;
    }

    course.signUpList.push(userId);
    return course.save();
}