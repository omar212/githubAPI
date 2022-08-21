import { useForm } from "react-hook-form";

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import "./styles.css";

function CustomCommentForm(props) {
  const  { createCustomIssue,containsImage, createIssueComment, imageForm, commentForm, issueForm } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  
  const onSubmit = (data) => {
    console.log('onSubmit: ',  data);

    if (commentForm) {
        createCustomIssue(data.issueNumber, data.comment);
    } else if (imageForm) {
        containsImage(data.issueNumber);
    } else if (issueForm) {
        createIssueComment(data.issueNumber, data.issue);
    }
    
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("COMMENT")); // you can watch individual input by pass the name of the input

  return (
    
        issueForm ? (
            <form onSubmit={handleSubmit(onSubmit, 'comment')}>
                {/* register your input into the hook by invoking the "register" function */}
                <div className="input-span">
            
                <span>Issue Number</span>
                <input type="number" defaultValue="" {...register("issueNumber", { required: true })} />
                {errors.issueNumber && <p>This field is required</p>}
        
                {/* include validation with required or other standard HTML validation rules */}
                <span>Comment</span>
                <textarea  {...register("comment", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.comment && <p>This field is required</p>}
        
                </div>
        
                <input type="submit" />
            </form>

        ) : commentForm ? (
            <form onSubmit={handleSubmit(onSubmit, 'issue')}>
                {/* register your input into the hook by invoking the "register" function */}
                <div className="input-span">
                <span>Title</span>
                <input defaultValue="" {...register("title", { required: true })} />
                {errors.title && <p>This field is required</p>}
        
                {/* include validation with required or other standard HTML validation rules */}
                <span>Comment</span>
                <textarea  {...register("comment", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.comment && <p>This field is required</p>}
                </div>
        
                <input type="submit" />
            </form>
        ) : imageForm ? (
            <form onSubmit={handleSubmit(onSubmit, 'image')}>
                {/* register your input into the hook by invoking the "register" function */}
                <div className="input-span">
            
                    <span>Issue Number</span>
                    <input type="number" defaultValue="" {...register("issueNumber", { required: true })} />
                    {errors.issueNumber && <p>This field is required</p>}
        
                </div>
        
                <input type="submit" />
            </form>
        ) : ""

    
  );
}

export default CustomCommentForm;