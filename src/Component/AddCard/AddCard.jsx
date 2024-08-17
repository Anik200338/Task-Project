import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useMutation } from '@tanstack/react-query';
import { FaUtensils } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AddCard = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_HOSTING_KEY
  }`;

  const { mutateAsync } = useMutation({
    mutationFn: async mealItem => {
      const { data } = await axiosPublic.post(`/AddProduct`, mealItem);
      return data;
    },
    onSuccess: () => {
      toast.success('New meal added to the menu.', {
        duration: 1500,
        position: 'top-right',
        className: 'z-[9999]',
      });

      reset();
      setIsSubmitting(false);
    },
    onError: error => {
      toast.error(`Error adding meal: ${error.message}`, {
        position: 'top-right',
      });

      setIsSubmitting(false);
    },
  });

  const onSubmit = async data => {
    setIsSubmitting(true);
    try {
      const imageFile = new FormData();
      imageFile.append('image', data.image[0]);
      const res = await axiosPublic.post(imageHostingApi, imageFile);

      if (res.data.success) {
        const mealItem = {
          productName: data.productName,
          description: data.description,
          image: res.data.data.display_url,
          category: data.category,
          price: parseFloat(data.price),
          rating: parseFloat(data.rating),
          postTime: new Date().toLocaleString(),
          User: {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
          },
        };
        await mutateAsync(mealItem);
        console.log(mealItem);
      } else {
        throw new Error('Image upload failed');
      }
    } catch (err) {
      toast.error(`Error uploading image: ${err.message}`, {
        position: 'top-right',
      });
      setIsSubmitting(false);
    }
  };
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full my-6">
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">productName*</span>
                </label>
                <input
                  type="text"
                  placeholder="productName"
                  {...register('productName', { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <label className="label">
                <span className="label-text">category*</span>
              </label>
              <input
                type="text"
                placeholder="category"
                {...register('category', { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">description</span>
              </label>
              <textarea
                {...register('description')}
                className="textarea textarea-bordered h-24"
                placeholder="description"
              ></textarea>
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                {...register('price', { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Rating*</span>
              </label>
              <input
                type="text"
                placeholder="Rating"
                {...register('rating', { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full my-6">
              <input
                {...register('image', { required: true })}
                type="file"
                className="file-input w-full max-w-xs"
              />
            </div>
            <button
              type="submit"
              className="btn btn-warning w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Product'}{' '}
              <FaUtensils className="ml-4" />
            </button>
          </form>
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddCard;
