const autoBind = require('auto-bind');
const Yup = require('yup');

class Validation {
  constructor() {
    this.variableToString = obj => Object.keys(obj)[0];
    autoBind(this);
  }

  async validateUserSession(req, res, next) {
    const schema = Yup.object().shape({
      us_email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    const { us_email, password } = req.body;
    const items = [
      { key: this.variableToString({ us_email }), value: us_email },
      { key: this.variableToString({ password }), value: password },
    ];

    const promises = items.map(async item =>
      Yup.reach(schema, item.key)
        .validate(item.value)
        .catch(err => {
          throw res.status(400).json({
            error: `$ ${item.key} - ${err.message}`,
          });
        })
    );

    await Promise.all(promises);

    req.us_email = us_email;
    req.password = password;

    return next();
  }

  async validateInsertUser(req, res, next) {
    const schema = Yup.object().shape({
      fun_id: Yup.number().required(),
      us_admin: Yup.bool().required(),
      us_company: Yup.bool().required(),
      us_tel: Yup.string()
        .min(7)
        .max(14)
        .required(),
      us_name: Yup.string()
        .min(4)
        .required(),
      us_email: Yup.string()
        .email('$ Email Inválido')
        .required(),
      us_cpf: Yup.string()
        .min(11, 'CPF Inválido')
        .max(12, 'CPF Inválido'),
      us_rg: Yup.string()
        .max(10, 'RG Inválido')
        .min(4, 'RG Inválido')
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
      address: Yup.object().shape({
        us_number: Yup.number().required(),
        us_cep: Yup.string().required(),
        us_address: Yup.string().required(),
        neighborhood: Yup.string().required(),
        us_complement: Yup.string().notRequired(),
      }),
    });

    const {
      fun_id,
      us_admin,
      us_company,
      us_tel,
      us_name,
      us_email,
      us_cpf,
      us_rg,
      password,
      address,
    } = req.body;

    const items = [
      { key: this.variableToString({ fun_id }), value: fun_id },
      { key: this.variableToString({ us_admin }), value: us_admin },
      { key: this.variableToString({ us_company }), value: us_company },
      { key: this.variableToString({ us_tel }), value: us_tel },
      { key: this.variableToString({ us_name }), value: us_name },
      { key: this.variableToString({ us_email }), value: us_email },
      { key: this.variableToString({ us_cpf }), value: us_cpf },
      { key: this.variableToString({ us_rg }), value: us_rg },
      { key: this.variableToString({ password }), value: password },
      { key: this.variableToString({ address }), value: address },
    ];

    const promises = items.map(async item =>
      Yup.reach(schema, item.key)
        .validate(item.value)
        .catch(err => {
          throw res.status(400).json({
            error: `$ ${item.key} - ${err.message}`,
            user_message: err.message,
          });
        })
    );

    await Promise.all(promises);

    req.fun_id = fun_id;
    req.us_admin = us_admin;
    req.us_company = us_company;
    req.us_tel = us_tel;
    req.us_name = us_name;
    req.us_email = us_email;
    req.us_cpf = us_cpf;
    req.us_rg = us_rg;
    req.password = password;
    req.address = address;
    next();
  }

  async validateFindByCPF(req, res, next) {
    const schema = Yup.object().shape({
      us_cpf: Yup.string()
        .min(10)
        .max(12)
        .required(),
    });

    const { us_cpf } = req.params;

    const items = [{ key: this.variableToString({ us_cpf }), value: us_cpf }];

    const promises = items.map(async item =>
      Yup.reach(schema, item.key)
        .validate(item.value)
        .catch(err => {
          throw res.status(400).json({
            error: `$ ${item.key} - ${err.message}`,
          });
        })
    );

    await Promise.all(promises);

    req.us_cpf = us_cpf;

    next();
  }
}

module.exports = new Validation();
