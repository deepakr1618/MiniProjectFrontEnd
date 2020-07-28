import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import "./mainpage.scss";
import { UserContext } from "../App";
import { fire } from "../utils/firebase";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import MuiAlert from "@material-ui/lab/Alert";

export default function MainPage() {
  const [section, setSection] = useState("A");
  const [sem, setSem] = useState("1");
  const [questionNumber, setQuestionNumber] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [subject, setSubject] = useState("");
  const [open, setOpen] = useState(false);
  const [maxMarks, setMaxMarks] = useState(0);
  const [toastMsg, setToastMsg] = useState({
    severity: "success",
    message: ""
  });

  const { state, dispatch } = useContext(UserContext);

  const notify = ({ severity, message }) => {
    setToastMsg({ severity, message });
    console.log(toastMsg);
    setOpen(true);
  };

  function Alert(props) {
    return <MuiAlert elevation={5} variant="filled" {...props} />;
  }

  function submitAnswer() {
    if (
      questionNumber === "" ||
      questionNumber.length <= 1 ||
      answer === "" ||
      subject === "" ||
      question === "" ||
      maxMarks.length === 0
    ) {
      notify({
        severity: "error",
        message: "Invalid data!"
      });
      return;
    }
    fire
      .firestore()
      .collection(`users`)
      .doc(`${state.user.uid}`)
      .set(
        {
          [sem]: {
            [subject]: {
              [questionNumber]: {
                answer,
                question,
                maxMarks: parseInt(maxMarks, 10)
              }
            }
          }
        },
        { merge: true }
      )
      .then(data => {
        notify({
          severity: "success",
          message: "Answer successfully saved!"
        });
      })
      .catch(data => {
        notify({
          severity: "error",
          message: "An error occured!"
        });
      });
  }

  return (
    <div className="mainpage-container">
      <div className="inner-container">
        <h1 className="title">Submit Answer : </h1>
        <div className="option">
          <p>Please select the semester</p>
          <div>
            <FormControl component="fieldset">
              <RadioGroup
                value={sem}
                className="radioGroup"
                onChange={newVal => setSem(newVal.target.value)}
              >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
                <FormControlLabel value="6" control={<Radio />} label="6" />
                <FormControlLabel value="7" control={<Radio />} label="7" />
                <FormControlLabel value="8" control={<Radio />} label="8" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="option">
          <p>Please enter the question no (Ex: 1a,2b..): </p>

          <TextField
            value={questionNumber}
            onChange={e => setQuestionNumber(e.target.value.toUpperCase())}
            color="secondary"
            label="Question Number"
            variant="outlined"
          />
        </div>
        <div className="option">
          <p>Please enter the maximum marks: </p>

          <TextField
            value={maxMarks}
            type="number"
            onChange={e => setMaxMarks(e.target.value < 0 ? 0 : e.target.value)}
            color="secondary"
            label="Maximum Marks"
            variant="outlined"
          />
        </div>

        <div className="option" style={{ flexDirection: "column" }}>
          <p style={{ alignSelf: "flex-start" }}>Subject : </p>

          <TextField
            value={subject}
            onChange={e => setSubject(e.target.value)}
            color="secondary"
            label="Subject"
            variant="outlined"
          />
        </div>
        <div className="option" style={{ flexDirection: "column" }}>
          <p style={{ alignSelf: "flex-start" }}>Question : </p>

          <TextField
            value={question}
            onChange={e => setQuestion(e.target.value)}
            color="secondary"
            label="Question"
            variant="outlined"
          />
        </div>
        <div className="option" style={{ flexDirection: "column" }}>
          <p style={{ alignSelf: "flex-start" }}>
            Please type the answer key :
          </p>
          <p
            style={{
              alignSelf: "flex-start",
              margin: "5px",
              fontSize: "12px",
              color: "#333"
            }}
          >
            To mark a word as keyword, enclose it within &lt;&lt;WORD&gt;&gt; :
          </p>
          <textarea
            className="answer"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
        </div>
        <Button
          style={{ alignSelf: "flex-end", width: "150px", marginTop: "20px" }}
          variant="contained"
          color="secondary"
          onClick={submitAnswer}
        >
          Submit
          <PublishOutlinedIcon style={{ width: "25px", marginLeft: "10px" }} />
        </Button>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity={toastMsg.severity}>{toastMsg.message}</Alert>
      </Snackbar>
    </div>
  );
}
