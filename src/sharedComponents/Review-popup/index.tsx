import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './index.module.scss';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Rating, TextareaAutosize } from '@mui/material';
import { ConstructionOutlined } from '@mui/icons-material';
import { useParams } from 'next/navigation';
import { getPostcomment } from '@/functions/globalFuntions';
// import { getPostcomment } from '@/functions/globalFuntions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  boxShadow: 24,
  border: 'none',
};

function WriteModal({ props, closeFunction }: any) {
  const [rating, setRating] = React.useState('')
  const [comment, setComment] = React.useState('')
  const [data, setData]: any = React.useState()



  const handleSubmit = () => {
    const obj = {
      "comment": String(comment),
      "rating": String(rating),
      "bikeId": Number(props?.bikeId),
      "uid": String(props?.uid)
    }
    if (obj?.uid == null || obj?.uid == undefined || obj?.bikeId == null || obj?.bikeId == undefined) {
      alert('Please log in to write a review.')
    }
    else if (obj?.comment === '' || obj?.rating > '5' || obj?.rating == '' || obj?.rating == null) {
      alert('Please fill in all required fields');
      return
    }
    else {
      console.log('Submitted Data:', obj);
      setData(obj)
      fetchuserComment()
    }
    closeFunction()
  };


  async function fetchuserComment() {
    let res = await getPostcomment(data)
    console.log(res)
  }
  const handleClose = () => {
    closeFunction()
  }
  return (
    <div>
      <Modal
        open={props.Open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={styles.popup_main}>
          <Box className={styles.heading_box}>
            <Typography className={styles.heading} id="modal-modal-title" variant="h6" component="h2">
              Write Your Review
              <Rating name="size-medium"
                value={rating}
                onChange={(event, newValue: any) => setRating(newValue)} />
            </Typography>
          </Box>
          <Typography className={styles.para} id="modal-modal-description" sx={{ mt: 1 }}>
            <TextareaAutosize className={styles.text_area} placeholder='Type Your comment here ..'
              value={comment}
              onChange={(e) => setComment(e.target.value)} />
          </Typography>
          <Button className={styles.submit_button} onClick={handleSubmit}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}
function MoreReviewModal({ props, closeFunctionmore }: any) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    border: 'none',
  };
  const handleClose = () => {
    console.log(props.data)
    closeFunctionmore()

  }
  return (
    <div>
      <Modal
        open={props.OpenMore}
        // open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={styles.more_review_main}>
          <Box className={styles.more_heading}>
            <Typography className={styles.heading} id="modal-modal-title" variant="h6" component="h2">
              Reviews
            </Typography>
            <Typography className={styles.closebtn} >
              <CloseIcon onClick={() => { handleClose() }} className={styles.closebtn} />
            </Typography>
          </Box>
          <Box className={styles.comment_box_main}>
          {
            props.data.map((e: any, i: any) => {
              console.log(e)
              return (
                <Typography key={i} className={styles.content_box}>
                  <Box className={styles.comment_box}>
                    <Box className={styles.comment_header}>
                      <Avatar alt="Remy Sharp" className={styles.avatar} src="" />
                      <Typography className={styles.detail}>
                        {e.user.userFullName}<span style={{ marginLeft: 5, marginRight: 5 }}> | </span><StarIcon sx={{ color: 'yellow', fontSize: '15px' }} />{e.rating}.0<span style={{ marginLeft: 5, marginRight: 5 }}> | </span> {e.createdAt.slice(0, 10)}
                      </Typography>
                    </Box>

                    <Typography className={styles.comment_text}>
                      {e.comment}
                    </Typography>
                  </Box>
                </Typography>
              )
            })
          }
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export { WriteModal, MoreReviewModal }


