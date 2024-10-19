import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import "./App.css";

function MediaCard(props: {
  heading: string;
  description: string;
  route: string;
}) {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.heading}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(props.route)}>
          Play
        </Button>
      </CardActions>
    </Card>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant={"h1"}>Anikennnn</Typography>
        <Typography variant={"h5"}>
          Have fun and let us know what you think!!
        </Typography>

        <Grid container spacing={2}>
          <MediaCard
            heading={"Unbetable Tic-Tac-Toe"}
            description={"You can not win this game. I challenge you!"}
            route={"/tic-tac-toe"}
          />
          <MediaCard
            heading={"Upcoming"}
            description={"Wait for new games!"}
            route={"/"}
          />
        </Grid>
      </header>
    </div>
  );
}

export default App;
