const {
  BASE_URL_RETRAIN_SUBMIT,
  BASE_URL_RETRAIN_DDA12,
  BASE_URL_RETRAIN_PC380,
  BASE_URL_DDA12,
} = require("../plugins/config");
const logger = require("../plugins/logger")(module);
const axios = require("axios");
const FormData = require("form-data");
const BASE_URL_DDA12_LOCAL = process.env.BASE_URL_DDA12 || BASE_URL_DDA12;
const BASE_URL_SUBMIT_RETRAIN_LOCAL =
  process.env.BASE_URL_RETRAIN_SUBMIT || BASE_URL_RETRAIN_SUBMIT;
const BASE_URL_RETRAIN_DDA12_LOCAL =
  process.env.BASE_URL_RETRAIN_DDA12 || BASE_URL_RETRAIN_DDA12;
const BASE_URL_RETRAIN_PC380_LOCAL =
  process.env.BASE_URL_RETRAIN_PC380 || BASE_URL_RETRAIN_PC380;

module.exports = {
  retraining: async (req, res, mp_id, section_code) => {
    headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    section = section_code;
    use_immediately = req.query.use_immediately;
    mp_id = mp_id;

    params = {
      section,
      use_immediately,
      mp_id,
    };
    const response = await axios
      .post(BASE_URL_RETRAIN_DDA12_LOCAL, req.body, {
        headers: headers,
        params: params,
      })
      .catch((error) => {
        logger.error(`[Retrain DDA12] mp_id: ${mp_id} ${error}`);
        logger.info(`[Retrain DDA12] mp_id: ${mp_id} failed ${error}`);
        return {
          data: {
            success: false,
            message: error,
          },
        };
      });
    return {
      success: response.data?.status == "success",
      message: response.data.message,
    };
  },
  predict: async (req, res) => {
    drug_type = req.body.drug_type;
    is_citizen = req.body.is_citizen;
    pd_gender = req.body.pd_gender;
    sch_accused_plead_guilty = req.body.sch_accused_plead_guilty;
    pd_repeated_offence = req.body.pd_repeated_offence;
    state = req.body.state;
    weight_of_drug = req.body.weight_of_drug;
    pd_age = req.body.pd_age;
    last_1_month_freq = req.body.last_1_month_freq;
    last_2_month_freq = req.body.last_2_month_freq;
    last_3_month_freq = req.body.last_3_month_freq;
    last_4_month_freq = req.body.last_4_month_freq;
    last_5_month_freq = req.body.last_5_month_freq;
    last_6_month_freq = req.body.last_6_month_freq;

    params = {
      drug_type,
      is_citizen,
      pd_gender,
      sch_accused_plead_guilty,
      pd_repeated_offence,
      state,
      weight_of_drug,
      pd_age,
      last_1_month_freq,
      last_2_month_freq,
      last_3_month_freq,
      last_4_month_freq,
      last_5_month_freq,
      last_6_month_freq,
    };

    const response = await axios
      .post(BASE_URL_DDA12_LOCAL, {
        drug_type: params.drug_type,
        is_citizen: params.is_citizen,
        pd_gender: params.pd_gender,
        sch_accused_plead_guilty: params.sch_accused_plead_guilty,
        pd_repeated_offence: params.pd_repeated_offence,
        state: params.state,
        weight_of_drug: params.weight_of_drug,
        pd_age: params.pd_age,
        last_1_month_freq: params.last_1_month_freq,
        last_2_month_freq: params.last_2_month_freq,
        last_3_month_freq: params.last_3_month_freq,
        last_4_month_freq: params.last_4_month_freq,
        last_5_month_freq: params.last_5_month_freq,
        last_6_month_freq: params.last_6_month_freq,
      })
      .catch((error) => {
        logger.error(`[DDA12 inferencing] ${error}`);
        logger.info(`[DDA12 inferencing] failed ${error}`);
        return {
          data: {
            success: false,
            message: error,
          },
        };
      });

    return {
      success: response.data?.status == "success",
      data: response.data,
    };
  },
};
