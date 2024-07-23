import { useDispatch } from 'react-redux';
import Button from '../../ui/Button.jsx';
import { removeItemFromCart } from './cartSlice.jsx';

function DeleteItem({ id }) {
  const dispatch = useDispatch();
  return (
    <Button type='small' onClick={() => dispatch(removeItemFromCart(id))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
