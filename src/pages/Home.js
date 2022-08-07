import {
  AppBar,
  Button,
  Container,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import { UserNote } from "../components/NoteCard";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };
  return (
    <div>
      <AppBar position="fixed" elevation={5} color="primary">
        <Toolbar>
          <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
            AL-QALAM UNIVERSITY PRESS
          </Typography>
          <Button
            style={{ marginLeft: "70%" }}
            onClick={() => history.push("/home")}
          >
            Login as admin
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{marginTop:90}} >
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map((note) => (
            <div key={note.id}>
              <UserNote note={note} />
            </div>
          ))}
        </Masonry>
      </Container>
    </div>
  );
}
