import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "../../../features/posts/postSlice";

function PostsForm() {
  const [post, setPost] = useState({ name: "", description: "" });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault()
    const toAdd = dispatch(addNewPost(post));
  };

  return (
    <form className="form-control" onSubmit={handleCreate}>
      <div className="container text-center">
        <div className="row">
          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="name"
              id="floatingInput"
              onChange={handleChange}
            />
            <label form="floatingInput" className="px-3">
              Name
            </label>
          </div>
          <div className="form-floating mb-2">
            <textarea
              className="form-control"
              name="description"
              placeholder="description"
              id="floatingTextarea"
              onChange={handleChange}
            ></textarea>
            <label form="floatingTextarea" className="px-3">
              Description
            </label>
          </div>
          <div className="col float-right">
            <input
              type="submit"
              className="btn btn-success btn-sm"
              value="Create"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default PostsForm;
