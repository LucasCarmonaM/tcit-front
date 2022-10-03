import PostsForm from "./components/postsForm";
import PostsList from "./components/postsList";
import Paper from "@mui/material/Paper";
import { Form } from "react-router-dom";

const PostsContainer = () => {
  return (
    <Paper className="container mt-3 pb-3">
      <PostsList />
      <PostsForm />
    </Paper>
  );
};

export default PostsContainer;
