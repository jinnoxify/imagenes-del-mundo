import { Avatar, Button } from "@material-ui/core";
import Axios from "axios";
import React, { useState } from "react";
import "./UserInfo.css";
import StarIcon from "@material-ui/icons/Star";
import Image from "./Image";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Link } from "react-router-dom";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: "#4f4fd4",
    border: "2px solid black",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: "white",
  },
}));

function UserInfo({ user }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [images, setImages] = useState([]);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [open1, setOpen1] = useState(false);
  const [coya, setCoya] = useState([]);

  const goNext = async () => {
    let invoice = await Axios.post(
      "https://api.alegra.com/api/v1/invoices",
      {
        date: "2015-11-15",
        dueDate: "2015-12-15",
        client: 2,
        items: [
          {
            id: 1,
            price: 120,
            quantity: 20,
          },
        ],
      },
      {
        authorization:
          "b3NjYXJwZXJlem5hdmFycm8xOTk3QGdtYWlsLmNvbTo3ODk0NTY3ODk0NTZsb2w=",
      }
    );
    setCoya(invoice);
  };

  console.log(coya);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Tenemos un ganador!! Felicidades {user}</h2>
      <Link to="/invoice">
        <Button
          onClick={goNext}
          variant="contained"
          color="primary"
          className="modalButton"
        >
          Continuar
        </Button>
      </Link>
    </div>
  );

  const submit = async (e) => {
    e.preventDefault();
    let imagesInfo = await Axios.get(
      `https://pixabay.com/api/?key=18669622-9631d9eb9f3f38ee14a1679a9&q=${userQuery}&per_page=15`
    );
    setImages(imagesInfo.data.hits);
    setOpen1(true);
  };

  const Choose1 = () => {
    setScore1(score1 + 3);
    if (score1 === 18) {
      setScore1(20);
      setOpen(true);
    }
  };
  const Choose2 = () => {
    setScore2(score2 + 3);
    if (score2 === 18) {
      setScore2(20);
      setOpen(true);
    }
  };
  const Choose3 = () => {
    setScore3(score3 + 3);
    if (score3 === 18) {
      setScore3(20);
      setOpen(true);
    }
  };

  return (
    <div className="userInfo">
      <h2>{user}</h2>
      <form>
        <input
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          className="userInfo__input"
          placeholder="Ingrese su palabra"
          type="text"
        />
        <button
          type="submit"
          onClick={submit}
          className="userInfo__button"
        ></button>
      </form>
      {open1 && (
        <>
          <div className="vendor">
            <div className="vendorInfo">
              <Avatar />
              <h3 className="vendorName">Vendedor 1</h3>
              <div className="vendorScore">
                <p>
                  <span>{score1}</span>/20
                </p>
                <StarIcon />
              </div>
            </div>
            <div className="vendorInfo">
              <Avatar />
              <h3 className="vendorName">Vendedor 2</h3>
              <div className="vendorScore">
                <p>
                  <span>{score2}</span>/20
                </p>
                <StarIcon />
              </div>
            </div>
            <div className="vendorInfo">
              <Avatar />
              <h3 className="vendorName">Vendedor 3</h3>
              <div className="vendorScore">
                <p>
                  <span>{score3}</span>/20
                </p>
                <StarIcon />
              </div>
            </div>
          </div>
          <div className="vendor__image">
            {images.slice(0, 3).map((image) => (
              <Image img={image.webformatURL} />
            ))}
          </div>
          <div className="vendor__button">
            <Button onClick={Choose1} variant="contained" color="primary">
              Escoger
            </Button>
            <Button onClick={Choose2} variant="contained" color="primary">
              Escoger
            </Button>
            <Button onClick={Choose3} variant="contained" color="primary">
              Escoger
            </Button>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </div>
        </>
      )}
    </div>
  );
}

export default UserInfo;
