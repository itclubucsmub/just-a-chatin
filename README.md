# just-a-chatin

![Node.js CI](https://github.com/itclubucsmub/just-a-chatin/workflows/Node.js%20CI/badge.svg?branch=master) ![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge)

Just a chatting with other.
Read development wiki [here](https://github.com/itclubucsmub/just-a-chatin/wiki). Check progress of app [here](https://github.com/itclubucsmub/just-a-chatin/projects/1).

## Migration 

Create schema
> node scripts/migrate.js up

Drop schema
> node scripts/migrate.js down

## Continuous Development
- Stack: heroku-18
- Framework: Node.js
- GitHub repo: itclubucsmub/just-a-chatin
- Heroku git URL: https://git.heroku.com/just-a-chatin.git

App can be found at https://just-a-chatin.herokuapp.com/

**Auto deploy for just a git push to master.**

### Config Vars

<code>
PAGE_ACCESS_TOKEN=
  
VERIFY_TOKEN=
</code>
