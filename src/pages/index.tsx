import { useEffect, useState, useRef } from "react";
type Choice = "🗿" | "🧻" | "✂️";
type Title = "Tie" | "CPU won" | "PLAYER won";
const outcomes = {
  "🧻": { "🗿": 1, "🧻": 0, "✂️": -1 },
  "🗿": { "🗿": 0, "🧻": -1, "✂️": 1 },
  "✂️": { "🗿": -1, "🧻": 1, "✂️": 0 },
};
const DefaultChoices: Choice[] = ["🗿", "✂️", "🧻"];
export default function Home() {
  const [userchoiceA, setuserchoiceA] = useState<Choice[]>([]);
  const [cpuchoiceA, setcpuchoiceA] = useState<Choice[]>([]);
  const [titlestore, settitlestore] = useState<Title[]>([]);
  const [scores, setScores] = useState({ Player: 0, CPU: 0 });
  const [timer, settimer] = useState<any>(0);
  const [start, setStart] = useState<boolean>(false);
  const intervalRef = useRef<any>(null);

  const userchoices: Choice[] = [];
  const cpuchoices: Choice[] = [];
  useEffect(() => {
    if (scores.Player == 4 || scores.CPU == 4) {
      if (scores.Player == 4) {
        setStart(false);
        clearInterval(intervalRef.current);
        alert("Player won");
      } else {
        setStart(false);
        clearInterval(intervalRef.current);

        alert("CPU won");
      }
      setScores({ Player: 0, CPU: 0 });
      setuserchoiceA([]);
      setcpuchoiceA([]);
      settitlestore([]);
    }
  }, [scores]);

  const handleUserChoice = (choice: Choice) => {
    if (start) {
      userchoices.push(choice);
      setuserchoiceA([...userchoiceA, userchoices[0]]);
      const cpuRandoms = Math.floor(Math.random() * 3);
      cpuchoices.push(DefaultChoices[cpuRandoms]);
      setcpuchoiceA([...cpuchoiceA, cpuchoices[0]]);
      winner(choice, DefaultChoices[cpuRandoms]);
    }
    settimer(0);
  };
  const winner = (user: Choice, cpu: Choice) => {
    const outcome = outcomes[user][cpu];
    if (outcome === 0) {
      settitlestore([...titlestore, "Tie"]);
    }
    if (outcome === 1) {
      settitlestore([...titlestore, "PLAYER won"]);
      setScores({ ...scores, Player: scores.Player + 1 });
    }
    if (outcome === -1) {
      settitlestore([...titlestore, "CPU won"]);
      setScores({ ...scores, CPU: scores.CPU + 1 });
    }
  };

  if (!intervalRef.current && start) {
    intervalRef.current = setInterval(() => {
      settimer((timer: any) => timer + 0.1);
    }, 100);
  }

  useEffect(() => {
    if (timer === 10.09999999999998) {
      const userRandoms: Choice = DefaultChoices[Math.floor(Math.random() * 3)];
      handleUserChoice(userRandoms);
    }
  }, [timer]);
  return (
    <div className="h-screen flex flex-col gap-3 justify-center items-center bg-slate-100">
      <div className="flex gap-3 w-full justify-around my-2">
        <div className="text-2xl flex ">CPU</div>
        <div className="text-3xl flex gap-3">
          <div className="text-red-500">{scores.CPU}</div>:
          <div className=" text-blue-500">{scores.Player}</div>
        </div>
        <div className="text-2xl">PLAYER</div>
      </div>
      <div
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
        className="w-[60vw] rounded-lg  h-[70vh] bg-white"
      >
        <div
          style={{ width: `${timer * 10}%`, transition: "0.5s" }}
          className={` h-[5px] bg-green-500 rounded-lg`}
        ></div>{" "}
        <div className="w-full h-16 px-4 flex items-center gap-5 border border-x-0 border-t-0">
          <img
            className="w-12 rounded-full "
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
          />
          <div className="text-md font-bold text-">CPU PLAYER</div>
        </div>
        <div className=" h-[88%] p-4 flex flex-col gap-2  overflow-scroll ">
          {start ? (
            userchoiceA.map((userchoice, i) => {
              return (
                <div key={i}>
                  <div className="flex items-center justify-end gap-3">
                    <div className="text-lg">{userchoiceA[i]}</div>:
                    <img
                      className="w-12 rounded-full "
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      alt=""
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      className="w-12 rounded-full "
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      alt=""
                    />
                    : <div className="text-lg">{cpuchoiceA[i]}</div>
                  </div>
                  <div className="w-full flex justify-center border-b-2">
                    {titlestore[i]}
                  </div>
                </div>
              );
            })
          ) : (
            <div className=" h-[100%] grid place-content-center">
              <button
                onClick={() => setStart(true)}
                className="rounded bg-green-500 px-6 py-3 text-white text-2xl "
              >
                Start
              </button>
            </div>
          )}
        </div>
      </div>
      <div className=" flex gap-3 ">
        <div
          className=" p-4 text-5xl rounded bg-white cursor-pointer butt"
          style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
          onClick={() => handleUserChoice("🗿")}
        >
          🗿
        </div>
        <div
          className=" p-4 text-5xl rounded bg-white cursor-pointer butt"
          style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
          onClick={() => handleUserChoice("🧻")}
        >
          🧻
        </div>
        <div
          className=" p-4 text-5xl rounded bg-white cursor-pointer butt"
          style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
          onClick={() => handleUserChoice("✂️")}
        >
          ✂️
        </div>
      </div>
    </div>
  );
}
{
}
