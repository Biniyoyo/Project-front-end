function submit(q){
        if (q?.status === "new") {
            return "createQuestionAPI(q) is called";
        } else if (q?.status === "editted") {
            return "updateQuestionAPI(q) is called";
        } else if (q?.status === "deleted") {
            return "deleteQuestionByIdAPI(q?._id) is called";
        }
};

module.exports = submit;