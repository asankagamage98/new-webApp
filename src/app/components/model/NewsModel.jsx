'use client'

import React from 'react'
import renderHTML from 'react-render-html';
import moment from 'moment';
import { Modal,Button } from 'flowbite-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function NewsModel({ data , setOpenModal, openModal, fetchNews }) {

 const token = useSelector((state) => state.login.token);
 
 console.log(data);
 // remove a note by id
const remove = (e, id) => {
    // confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          // Check if token exists
          if (token) {
            // Set the authorization header with the token
            const auth = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
  
            // Make the DELETE request to delete the news item
            axios
              .delete(`http://localhost:3020/api/news/${id}`, auth)
              .then(() => {
                // success
                Swal.fire({
                  title: 'Deleted!',
                  text: 'Your file has been deleted.',
                  icon: 'success',
                });
                setOpenModal(false);
                fetchNews();
              })
              .catch((err) => {
                // error
                console.error('Error deleting news:', err);
                alert('Error deleting news. Please try again later.');
              });
          } else {
            console.error('User token not found.');
            // Handle case where token is missing
            // You can redirect to login page or show an error message
          }
        } catch (error) {
          // Handle errors
          console.error('Error deleting news:', error);
          alert('Error deleting news. Please try again later.');
        }
      }
    });
  };
  

// navigate to edit screen
// const onClickUpdate = (e, id) => {
//     router.push(`/news/${id}/edit`)
// }
  return (
    <>
    <Modal show={openModal} className="" onClose={() => setOpenModal(false)}>
        <Modal.Header className="bg-white">
            <p className="text-secondary">{data.title}</p>
        </Modal.Header>
        <Modal.Body>
            <div className="space-y-6">
                <p className="text-base leading-relaxed text-black">{renderHTML(data.description)}</p>
                <p className="text-base leading-relaxed  text-secondary">
                    Last updated :{moment(data.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
            </div>
        </Modal.Body>
        <Modal.Footer className=" gap-3 flex justify-end">
            <div className="flex items-center gap-3">
              
                <Button  className="w-full" onClick={(e) => remove(e, data._id)} gradientMonochrome="failure">Detete</Button>
                <Button   className="w-full" gradientMonochrome="success" >Edit</Button>

            </div>
        </Modal.Footer>
    </Modal>
</>
  )
}
