import { useSelector } from 'react-redux'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

function TransactionItem(props) {

  const categories = useSelector(state => state.category.value)

  function getIconName(target_id) {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].category_id === target_id) return categories[i].icon_name
    } 
    return ""
  }

  return (
    <ListItem sx={{ borderBottom: '1px dotted gray' }}>
      <ListItemAvatar>
        <button className="w-12 h-12 rounded-full">
          <span className="material-icons-round text-cyan-300 text-2xl">{getIconName(props.item.category_id)}</span>
        </button>
      </ListItemAvatar>  
      <ListItemText primary={props.item.amount} secondary={props.item.note} />
    </ListItem>
  )
}

export default TransactionItem;