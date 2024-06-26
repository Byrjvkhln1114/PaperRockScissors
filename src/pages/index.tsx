import { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
type Choice = "yes" | "no";

const questions = [
  "Your neighbouring country wants to set up camp near your border, do you accept?",
  "Due to inflation your government funding may decrease, would you like to raise taxes?",
  "Would you like to promote an official government religion?",
  "Would you like to increase military funding?",
  "Would you like to increase the minimum wage only for government workers?",
];
let prd = 0;
const DefaultChoices: Choice[] = ["yes", "no"];

export default function Home() {
  const [userchoiceA, setuserchoiceA] = useState<Choice[]>([]);
  const [result, setResult] = useState<any>("You are good guy");
  const [scores, setScores] = useState({ Player: 0, CPU: 0 });
  const [timer, settimer] = useState<any>(0);
  const [start, setStart] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [period, setPeriod] = useState(0);
  const intervalRef = useRef<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const userchoices: Choice[] = [];
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [userchoiceA]);
  useEffect(() => {
    if (end == true) {
      switch (scores.Player) {
        case 5:
          setStart(false);
          setResult(
            "Your citizens are unhappy with your decisions, your country is in extreme and immediate danger of revolution or invasion"
          );
          clearInterval(intervalRef.current);
          break;
        case 4:
          setStart(false);
          setResult(
            "Your actions have caused widespread distaste within your population and they are largely unsatisfied. There is infighitng between your citizens"
          );
          clearInterval(intervalRef.current);
          break;
        case 3:
          setStart(false);
          clearInterval(intervalRef.current);
          setResult(
            "Although your actions could be better, its not the worst. The rich are happy but the common folk and blue collar workers are not fully satisfied. There is still looming danger of conflict but if you make correct decisions it can be avoided"
          );
          break;
        case 2:
          setStart(false);
          clearInterval(intervalRef.current);
          setResult(
            "Your country is not happy but not completely unhappy, there is much improvement to be made. There are still some notes of rebellion and conflict"
          );
          break;
        case 1:
          setStart(false);
          clearInterval(intervalRef.current);
          setResult(
            "Most of your citizens are slightly disapproving of you and your actions, if you keep this up there can be a large insurrection, or invasion"
          );
          break;
        case 0:
          setStart(false);
          clearInterval(intervalRef.current);
          break;
        case -1:
          setStart(false);
          clearInterval(intervalRef.current);
          setResult("Your citizens and neighbours favour you slightly, but there is much improvement to be made.");
          break;
        case -2:
          setStart(false);
          clearInterval(intervalRef.current);
          setResult("Your citizens and neighbours like your actions but there are still some that are rebellious");
          break;
        case -3:
          setStart(false);
          clearInterval(intervalRef.current);
          setResult(
            "You are doing a decent job in running your country, but it is far from perfect. The majority of the population and neighbours are still not in your favour. Conflicts are still likely to occur"
          );
          break;
        case -4:
          setStart(false);
          clearInterval(intervalRef.current);
          setResult(
            "You are widely liked but as always there are unhappy people. Though conflicts are far away, it is not in the realm of impossible"
          );
          break;
        case -5:
          setStart(false);
          clearInterval(intervalRef.current);
          setResult(
            "This is closest to the best case scenario. Though total utopia is impossible you are trying your best. But there are always unknown dangers"
          );
          break;
        default:
          break;
      }
      setStart(false);
      setScores({ Player: 0, CPU: 0 });
      setuserchoiceA([]);
      handleShow();
    }
  }, [end]);
  const ender = () => {
    setEnd(true);
  };

  const handleUserChoice = (choice: any) => {
    if (start) {
      userchoices.push(choice);
      setuserchoiceA([...userchoiceA, userchoices[0]]);
      if (choice == "yes") {
        setScores({ ...scores, Player: scores.Player + 1 });
      } else {
        setScores({ ...scores, Player: scores.Player - 1 });
      }
    }
    prd = prd + timer;
    setPeriod(prd);
    settimer(0);
  };

  const starter = () => {
    prd = 0;
    settimer(0);
    setPeriod(0);
    setStart(true);
    setEnd(false);
    intervalRef.current = setInterval(() => {
      settimer((timer: any) => timer + 0.1);
    }, 100);
  };
  console.log(period);

  useEffect(() => {
    // setPeriod(Number(timer) + Number(period));
    if (timer === 10.09999999999998) {
      alert("If you run out of time while answering, a random answer will be selected for you!");
      const userRandoms: Choice = DefaultChoices[Math.floor(Math.random() * 2)];
      handleUserChoice(userRandoms);
    }
  }, [timer]);

  return (
    <div style={{ backgroundColor: "#323437" }} className="h-screen flex flex-col gap-3 justify-center items-center">
      <Modal className="w-100 " show={show} onHide={handleClose}>
        <div
          style={{
            borderRadius: "7px",
            backgroundColor: "#323437",
          }}
          className="text-light"
        >
          <Modal.Body>
            <div style={{ color: "white" }}>
              Here is the fate of your country based on your answers. In real life you would not be able to replay and
              redo. But this is a video game, you may have another try.
            </div>
            <br />
            <h1 style={{ color: "white" }}>Result:</h1>
            <div style={{ fontSize: 25, fontWeight: "bold", color: "red" }}> {result}</div>
            <br />
            <h1 style={{ color: "white" }}>Time:</h1>
            <div style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Also you spent <span style={{ color: "green" }}>{Math.floor(period)} seconds</span> on the questions that
              may affect the lives of an entire nation. Do you think you spent enough time or too much time?
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ width: "130px", height: "50px", fontSize: "20px", backgroundColor: "#FF7718", border: "none" }}
              onClick={() => (handleClose(), setPeriod(0))}
            >
              Try Again
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
      <div className="w-[80vw] rounded-lg  h-[70vh] bg-dark">
        <div
          style={{ width: `${timer * 10}%`, transition: "0.5s", backgroundColor: "#FF7718" }}
          className={` h-[5px]  rounded-lg`}
        ></div>{" "}
        <div style={{ borderBottom: "1px solid grey" }} className="w-full h-16 px-4 flex items-center gap-3 ">
          <img
            className="w-12 rounded-full "
            src="https://scontent.fuln6-1.fna.fbcdn.net/v/t1.15752-9/441923974_391137510565008_4804870506305460155_n.png?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ch5qSOBf9GAQ7kNvgFYl6AT&_nc_ht=scontent.fuln6-1.fna&oh=03_Q7cD1QFD9brc4e5dt-HOOwoQhJdqUNp8k071FwAxXihTae0ShA&oe=66791318"
            alt=""
          />
          <div className="text-md font-bold text-">What will be your choice?</div>
        </div>
        <div className=" h-[88%] p-4 flex flex-col gap-2  overflow-scroll ">
          <div style={{ display: start ? "flex" : "none" }} className="flex items-center gap-3">
            <img
              className="w-12 rounded-full "
              src="https://scontent.fuln6-1.fna.fbcdn.net/v/t1.15752-9/441923974_391137510565008_4804870506305460155_n.png?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ch5qSOBf9GAQ7kNvgFYl6AT&_nc_ht=scontent.fuln6-1.fna&oh=03_Q7cD1QFD9brc4e5dt-HOOwoQhJdqUNp8k071FwAxXihTae0ShA&oe=66791318"
              alt=""
            />
            :{" "}
            <div style={{ color: "white" }} className="text-lg fw-bold">
              {questions[0]}
            </div>
          </div>
          {start ? (
            userchoiceA.map((userchoice, i) => {
              if (i == 4) {
                if (!end) {
                  ender();
                }
              }
              return (
                <div key={i}>
                  <div className="flex items-center justify-end gap-3">
                    <div className={`text-lg text-${userchoiceA[i] == "yes" ? "success" : "warning"} fw-bold`}>
                      {userchoiceA[i]}
                    </div>
                    :
                    <img
                      className="w-12 rounded-full "
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      alt=""
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      className="w-12 rounded-full "
                      src="https://scontent.fuln6-1.fna.fbcdn.net/v/t1.15752-9/441923974_391137510565008_4804870506305460155_n.png?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ch5qSOBf9GAQ7kNvgFYl6AT&_nc_ht=scontent.fuln6-1.fna&oh=03_Q7cD1QFD9brc4e5dt-HOOwoQhJdqUNp8k071FwAxXihTae0ShA&oe=66791318"
                      alt=""
                    />
                    :{" "}
                    <div style={{ color: "white" }} className="text-lg fw-bold">
                      {questions[i + 1]}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className=" h-[100%] grid place-content-center">
              <button
                onClick={() => starter()}
                style={{ backgroundColor: "#FF7718" }}
                className="rounded  px-6 py-3 text-white text-xl fw-bold "
              >
                Start
              </button>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className=" flex gap-3 ">
        <div
          className=" p-4 text-3xl rounded bg-dark cursor-pointer butt"
          style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", color: "white" }}
          onClick={() => handleUserChoice("yes")}
        >
          yes
        </div>
        <div
          className=" p-4 text-3xl rounded bg-dark cursor-pointer butt"
          style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", color: "white" }}
          onClick={() => handleUserChoice("no")}
        >
          no
        </div>
      </div>
    </div>
  );
}
