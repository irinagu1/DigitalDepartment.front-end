import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MainCard(props) {
  return (
    <>
    {console.log(props.props.text)}
      <Card sx={{ height: "100%", width:'50%' }}>
        <CardContent >
          <Typography
            component="h2"
            variant="subtitle2"
            gutterBottom
            sx={{ fontWeight: "600" }}
          >
            {props.props.text}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: "8px" }}>
            {props.props.description}
          </Typography>
          <Button variant="contained" size="small" color="primary" >
            Перейти
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
