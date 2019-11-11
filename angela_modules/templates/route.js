getTemplate = name => {
  return `
//Customize this route
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
\tres.status(200).send(\'Get ${name} \');
});

router.get('/:id', (req,res) => {
\tres.status(200).send(\`Get record with id \$\{req.params.id\} from ${name} \`);
});

router.post('/', (req, res) => {
\tres.status(200).send(\'Post ${name} \');
});

router.put('/:id', (req,res) => {
\tres.status(200).send(\`Put/update record with id \$\{req.params.id\} from ${name} \`);
});

router.delete('/:id', (req,res) => {
\tres.status(200).send(\`Delete record with id \$\{req.params.id\} from ${name} \`);
});

module.exports = router;
`;
};

module.exports.getRouteTemplate = getTemplate;
