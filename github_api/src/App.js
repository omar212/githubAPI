import { useState, useEffect } from 'react';
import './App.css';
import { Octokit, App as OcktoApp } from "octokit";
import githubAPI from './githubAPI';
import ActionButtons from './Components/ActionButtons';
import DisplayIssues from './Components/DisplayIssues';
import CustomForm from './Components/CustomForm';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [issues, setIssues] = useState([]);
  const [form, setForm] = useState(false);
  const [showAllIssues, setShowAllIssues] = useState(false);
  const [issueForm, setIssueForm] = useState(false);
  const [imageForm, setImageForm] = useState(false);
  const [commentForm, setCommentForm] = useState(false);
  const [title, setTitle] = useState('');
  const [repo, setRepo] = useState('HerQuest');


  const octokit = new Octokit({
    auth: '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',
  })

  const authenticateUser = () =>  {
    githubAPI.health('omar212').then(response => {
      const { data, status } = response;
      console.log('data: ', data)

      if (data && status === 200) {
        setUser(data.login);
      } else {
        setUser('No User Found');
      }
    })
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  const reset = () => {
    setLoading(true)
    setTitle('');
    
  }
  const fetchIssues = () => {
    reset();
    setShowAllIssues(true)
    setForm(false)
    
    githubAPI.fetchIssues(user, repo).then(response => {
      const { data, status } = response;
      console.log('data: ', data, 'status: ', status)

      if (data && status === 200) {
        setIssues(data)
      } else {
        setTitle('No Data Found');
      }
      setLoading(false)
    });
  }
  

  const createIssue = () => {
    reset();
    setShowAllIssues(false)

    githubAPI.createIssue(user, repo, 'Default Title', 'Default Comment').then(response => {
      const { data, status } = response;
      console.log('data: ', data, 'status: ', status)

      if (data && status === 201) {
        setTitle('Issue Created');
      } else {
        setTitle('No Data Found');
      }
      setLoading(false)
    });
  }

  const createCustomIssue = (title, comment) => {
    reset();

    githubAPI.createCustomIssue(user, repo, title, comment).then(response => {
      const { data, status } = response;
      console.log('data: ', data, 'status: ', status)

      if (data && status === 201) {
        setTitle('Issue Created');
      } else {
        setTitle('No Data Found');
      }
      setLoading(false)
    });
  }
  
  const checkIfImageExists = (url, callback) => {
    const img = new Image();
    img.src = url;
    
    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };
      
      img.onerror = () => {
        callback(false);
      };
    }
  }

  const createIssueComment = (issueNumber, comment) => {
    reset();

    const timestamp = new Date().toUTCString();
    comment = `${comment}  ${timestamp}`;

    githubAPI.createIssueOnComment(user, repo, issueNumber, comment).then(response => {
      const { data, status } = response;
      console.log('data: ', data, 'status: ', status)

      if (data && status === 201) {
        setTitle(`Issue Created On Comment ${issueNumber}`);
      } else if(status === 404) {
        setTitle('No Issue Found');
      } else {
        setTitle('API Error');
      }
      setLoading(false)
    });

  }


  const containsImage = (issueNumber) => {
    reset();

    githubAPI.containsImage(user, repo, issueNumber).then(response => {
      const { data, status } = response;
      console.log('data: ', data, 'status: ', status)
      // debugger
      if (data && status === 200) {
        let body = data.body;
        let splitBody = body.split(' ');
        let image = splitBody.find(word => word.includes('!['))?.match(/\((.*)\)/).pop()
        console.log("image: ", image)
        if(image) {
          checkIfImageExists(image,(exists) => {
            if (exists) {
              setTitle('Image Exists')
              createIssueComment(issueNumber, 'I found an Image in your issue.');
            } else {
              setTitle('Image does not exists.')
            }
          })
        } else {
          setTitle('Image does not exists.')
        }
        
      } else if(status === 404) {
        setTitle('No Issue Found');
      } else {
        setTitle('API Error');
      }
      setLoading(false)
    });

  }

  const showCustomIssueForm = () => {
    setTitle('')
    setForm(true)
    setIssueForm(true)
    setCommentForm(false)
    setImageForm(false)
  }
  const showCustomCommentForm = () => {
    setTitle('')
    setForm(true)
    setCommentForm(true)
    setIssueForm(false)
    setImageForm(false)
  }

  const showImageForm = () => {
    setTitle('')
    setForm(true)
    setImageForm(true)
    setIssueForm(false)
    setCommentForm(false)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>{user}</h1> 
        <div>
        {
          user && user !== '' || user === 'No User Found' ? (
            <CheckIcon style={{fill: 'green'}} />
          ) : (
            <CloseIcon style={{fill: 'red'}} />
          )
        }
        </div>
      </header>
      <div className="page">
        <ActionButtons 
          fetchIssues={fetchIssues} 
          createIssue={createIssue}
          showCustomImageForm={showImageForm}
          showCustomCommentForm={showCustomIssueForm}
          showCustomForm={showCustomCommentForm}
        />
        
        {
          showAllIssues && <DisplayIssues form={form} loading={loading} issues={issues}/> 
        }
        
        {
          form && <CustomForm 
                      imageForm={imageForm} 
                      commentForm={commentForm}
                      issueForm={issueForm}
                      createCustomIssue={createCustomIssue}
                      createIssueComment={createIssueComment}
                      containsImage={containsImage}
                  />
        }

        {
          title && <h1>{title}</h1>
        }
        
          
      </div>
      
    </div>
  );
}

export default App;
