import {Button, Card, Stack} from "react-bootstrap"
import {Link} from "react-router-dom"

const DocCard = (props) => {
    return (
      <Card style={{ width: '14rem' }}>
        <Card.Img variant="top" height={200} src= {props.src}/>
        <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Stack direction="horizontal" gap = {5}>
                <Card.Text>
                    {props.price}
                </Card.Text>
                <Link className="btn btn-rounded btn-primary" to={`/docs/${props.id}`}>More</Link>
            </Stack>
        </Card.Body>
      </Card>
    )
}

export default DocCard