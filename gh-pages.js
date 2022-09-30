// deployed with the help of https://www.devsamples.com/javascript/svelte/deploy-svelte-app-gh-pages

var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/runlinwang/todosveltefirebase.git', // Update to point to your repository  
        user: {
            name: 'RunLin Wang', // update to use your name
            email: 'rwang3@college.harvard.edu' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)