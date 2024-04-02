/**
 * @author wou
 */
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TopicOptionsModal from '../../modal/topic/TopicOptionsModal';
import moreDots from '../../icons/menudots.png';
import '../../App.css';
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import { removeTag } from '../../tagSlice';
import UpdateTopicModal from '../../modal/topic/UpdateTopicModal';
import 'react-contexify/ReactContexify.css';

const TopicListItem = ({ tag }) => {

  const [topicOptionsModalOpen, setTopicOptionsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [updateTopicModalOpen, setUpdateTopicModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // context menu

  const { show } = useContextMenu({
    id: tag,
  });

  function handleContextMenu(event){
      show({
        event,
        props: {
            key: 'value'
        }
      })
  }

  // I'm using a single event handler for all items
  // but you don't have too :)
  const handleItemClick = ({ id, event, props }) => {
    switch (id) {
      case "copy":
        // console.log(event, props)
        break;
      case "cut":
        // console.log(event, props);
        break;
      //etc...
    }
  }

  const containedNotes = useSelector((state) => {
    const documents = state.documents.documents;
    const filtered = documents.filter((document) => {
        return document[4] && document[4].includes(tag);
    })
    return filtered;
  })

  const handleTopicOptionsModalOpen = (value) => {
    setTopicOptionsModalOpen(true);
  }

  //delete topic
  const handleRemoveTag = (tagItem) => {
    dispatch(removeTag(tagItem));
  }

  const handleClick = (e) => {
    e.stopPropagation();
    show({
      event,
      props: {
          key: 'value'
      }
    })
    setSelectedTopic(tag);
  }

  const handleClose = () => {
    setUpdateTopicModalOpen(false);
  };

  return (
    <div className='topicListItem' key={tag} >

    <Menu id={tag}>
        <Item id="rename" onClick={() => setUpdateTopicModalOpen(true)}>Rename</Item>
        <Item id="delete" onClick={() => handleRemoveTag(selectedTopic)}>Delete</Item>
    </Menu>

      {/* <TopicOptionsModal
        show={topicOptionsModalOpen}
        selectedTopic={selectedTopic}
        onHide={() => setTopicOptionsModalOpen(false)}
      /> */}

      <UpdateTopicModal
      show={updateTopicModalOpen}
      selectedTag={selectedTopic}
      onHide={() => setTopicOptionsModalOpen(false)}
      handleClose={handleClose}
       />

      <div className='topicListTextContainer' onClick={() => navigate(`/topics/${tag}`)}>
        <div className='topicListTextWrapper'>
          <div className='topicListTitle'>
            <span>{tag}</span>
          </div>
          <div className='topicListInfo'>
            {containedNotes.length == 1 && <span>{containedNotes.length} Note</span>}
            {containedNotes.length > 1 && <span>{containedNotes.length} Notes</span>}
          </div>
          <div className='topicOptionsMenuContainer' onClick={handleClick}>
            <img src={moreDots} className='moreDots'></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicListItem;