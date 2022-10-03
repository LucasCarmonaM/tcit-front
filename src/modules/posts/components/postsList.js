import { useSelector, useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import {
  getPostsError,
  getPostsStatus,
  selectAllPosts,
  getPosts,
  deletePost,
  deletePostClient,
} from "../../../features/posts/postSlice";
import DataTable from "./postsTable";
import { DeleteButton } from "./buttonDelete";
import _ from "lodash";

const PostsList = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsErrors = useSelector(getPostsError);
  if (postsStatus === "idle") {
    dispatch(getPosts());
  }

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
    dispatch(deletePostClient(postId));
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const memoPosts = useMemo(() => {
    return posts;
  }, [posts]);

  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Action",
      Cell: ({ row }) => {
        return (
          <DeleteButton handleDelete={() => handleDelete(row.original.id)} />
        );
      },
    },
  ];

  return (
    <div>
      <h2 className="align-center">Posts</h2>
      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="name"
          id="floatingInput"
          onChange={handleFilter}
        />
        <label form="floatingInput" className="px-3">
          Name
        </label>
      </div>
      {postsStatus === "succeeded" ? (
        <DataTable
          columns={columns}
          data={_.filter(memoPosts, (post) =>
            post.name.match(new RegExp(filter))
          )}
        />
      ) : postsStatus === "loading" ? (
        <p>Loading...</p>
      ) : (
        <p>{postsErrors}</p>
      )}
    </div>
  );
};

export default PostsList;
