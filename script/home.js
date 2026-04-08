console.log("home.js script connecting");

let allIssues = [];

/* Fetching all Data */
const loadIssues = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(json => {
        allIssues = json.data;
        displayIssues(allIssues);

    });
}

/* Display Issues */
const displayIssues = (issues) =>{
    const issueContainer = document.getElementById('issue-container');
    issueContainer.innerHTML="";

    issues.forEach(issue => {
        const div = document.createElement('div');

        div.innerHTML=`
        
        `;
    })

}

const allIssuesShow=()=>{

}

loadIssues();