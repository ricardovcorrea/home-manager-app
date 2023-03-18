import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const CreateProductPage = () => {
  const navigate = useNavigate();

  return (
    <div className={"page new-product-page"}>
      <div className='page__header'>
        <div className='page__title'>
          <h1>Create product</h1>
        </div>
        <div className='page__actions'>
          <Button
            variant='danger'
            onClick={() => {
              navigate("/products");
            }}
          >
            Cancel
          </Button>
          <Button
            variant='success'
            onClick={() => {
              navigate("/products");
            }}
          >
            Save
          </Button>
        </div>
      </div>
      <div className='page__body'>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>EAN</Form.Label>
            <Form.Control type='text' />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};
