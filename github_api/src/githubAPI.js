import axios from 'axios';
import { Octokit } from "octokit";


const PARAMS = ({ methodType = 'GET' }) => ({
    method: methodType,
    headers: {
      'Content-Type': 'application/json',
    },
  });

const octokit = new Octokit({
auth: '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',
})



export default {

    fetchIssues: async (username, repo) => {
        const URL = `https://api.github.com/repos/${username}/${repo}/issues`;
        let response = {};
        
        try {
            const res = await axios(URL, PARAMS({ methodType: 'GET' }));

            console.log('res: ', res )

            response = {
                data: res.data,
                status: res.status
            };

        } catch (error) {
            console.log(error.toString());
        }

        console.log(`⚠️ STATUS fetchIssues() ${response.status}`);

        return response;
    },
    
    
    health: async (username) => {
        const URL = `https://api.github.com/users/${username}`;
        let response = {};
        
        try {
            const res = await axios(URL, PARAMS({ methodType: 'GET' }));

            console.log('res: ', res )

            response = {
                userData: res.data,
                status: res.status
            };

        } catch (error) {
            console.log(error.toString());
        }

        console.log(`⚠️ STATUS fetchUser() ${response.status}`);

        return response;
    },

    checkRepo: async (username, repo) => {
        const URL = `https://api.github.com/repos/${username}/${repo}`;
        let response = {};

        try {
            const res = await axios(URL, PARAMS({ methodType: 'GET' }));
            
            console.log('res: ', res )

            response = {
                repoData: res.data,
                status: res.status
            };
            
        } catch (error) {
            console.log(error.toString());
        }

        console.log(`⚠️ STATUS checkRepo() ${response.status}`);

        return response;
    },

    createIssue: async (username, repo, title, comment) => {
        const URL = `https://api.github.com/repos/${username}/${repo}/issues`;
        let response = {};
        
        try {

            const res = await octokit.request('POST /repos/{owner}/{repo}/issues', {
                owner: username,
                repo: repo,
                title: title,
                body: comment 
            })

            response = {
                data: res.data,
                status: res.status
            };

        } catch (error) {
            console.log(error.toString());
        }

        console.log(`⚠️ STATUS createIssue() ${response.status}`);

        return response;
    },

    createCustomIssue: async (username, repo, title, comment) => {
        const URL = `https://api.github.com/repos/${username}/${repo}/issues`;
        let response = {};
        
        try {

            const res = await octokit.request('POST /repos/{owner}/{repo}/issues', {
                owner: username,
                repo: repo,
                title: title,
                body: comment 
            })

            response = {
                data: res.data,
                status: res.status
            };

        } catch (error) {
            console.log(error.toString());
        }

        console.log(`⚠️ STATUS createIssue() ${response.status}`);

        return response;
    },

    createIssueOnComment: async (username, repo, issueNumber, comment) => {
        const URL = `https://api.github.com/repos/${username}/${repo}/issues/${issueNumber}/comments`;
        let response = {};
        const timestamp = new Date().toUTCString();
        
        try {

            const res = await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
                owner: username,
                repo: repo,
                issue_number: issueNumber,
                body: comment 
            })

            response = {
                data: res.data,
                status: res.status
            };

        } catch (error) {
            console.log(error.toString());
        }

        console.log(`⚠️ STATUS createIssueOnComment() ${response.status}`);

        return response;
    },

    containsImage: async (username, repo, issueNumber) => {
        const URL = `https://api.github.com/repos/${username}/${repo}/issues/${issueNumber}`;
        let response = {};
        
        try {

            const res = await axios(URL, PARAMS({ methodType: 'GET' }));

            console.log('res: ', res )

            response = {
                data: res.data,
                status: res.status
            };

        } catch (error) {
            console.log(error.toString());
        }

        console.log(`⚠️ STATUS containsImage() ${response.status}`);

        return response;
    }
};
