const submit = require('./submit');

const q1 = {
    questionType: "text",
    questionText: "",
    multipleChoice: ["", "", ""],
    createdDate: new Date(),
    responses: {},
    status: "editted",
};
const q2 = {
    questionType: "text",
    questionText: "",
    multipleChoice: ["", "", ""],
    createdDate: new Date(),
    responses: {},
    status: "new",
};

test("updateAPI message should be returned for q1 with status editted submit", ()=>{
    expect(submit(q1)).toBe("updateQuestionAPI(q) is called");
});

test("updateAPI message should be returned for q1 with status new submit", ()=>{
    expect(submit(q2)).toBe("createQuestionAPI(q) is called");
});