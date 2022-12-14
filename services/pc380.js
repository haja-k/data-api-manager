const {
  BASE_URL_PC380
} = require("../plugins/config");
const logger = require("../plugins/logger")(module);
const axios = require("axios");
const BASE_URL_PC380_LOCAL = process.env.BASE_URL_PC380 || BASE_URL_PC380;
const BASE_URL_PC380_TESTER_LOCAL = process.env.BASE_URL_PC380_TESTER || BASE_URL_PC380_TESTER;
const BASE_URL_PC380_RETRAIN_LOCAL = process.env.BASE_URL_RETRAIN_PC380 || BASE_URL_RETRAIN_PC380;

module.exports = {
  retraining: async (req, res, mp_id, section_code) => {
    headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    section = section_code;
    use_immediately = req.query.use_immediately;
    mp_id = mp_id;

    params = {
      section,
      use_immediately,
      mp_id,
    };
    const response = await axios
      .post(BASE_URL_PC380_RETRAIN_LOCAL, req.body, {
        headers: headers,
        params: params,
      })
      .catch((error) => {
        logger.error(`[Retrain PC380] mp_id: ${mp_id} ${error}`);
        logger.info(`[Retrain PC380] mp_id: ${mp_id} failed ${error}`);
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
    condition_of_item = req.body.condition_of_item;
    cooperation_with_the_enforcement_officers = req.body.cooperation_with_the_enforcement_officers;
    is_item_recovered = req.body.is_item_recovered;
    is_there_appeal = req.body.is_there_appeal;
    is_under_remand = req.body.is_under_remand;
    state = req.body.state;
    pd_employment_status = req.body.pd_employment_status;
    pd_nationality = req.body.pd_nationality;
    use_of_violence = req.body.use_of_violence;
    previous_conviction_records = req.body.previous_conviction_records;
    previous_conviction_same_offence = req.body.previous_conviction_same_offence;
    relationship_with_victim = req.body.relationship_with_victim;
    restitution_of_item = req.body.restitution_of_item;
    pd_marital_status = req.body.pd_marital_status;
    sch_accused_found_guilty_after_ft = req.body.sch_accused_found_guilty_after_ft;
    sch_accused_plead_guilty = req.body.sch_accused_plead_guilty;
    monthly_income_range_group = req.body.monthly_income_range_group;
    is_public_interest = req.body.is_public_interest;
    is_there_any_injury = req.body.is_there_any_injury;
    pd_gender = req.body.pd_gender;
    number_of_dependants = req.body.number_of_dependants;
    pd_age = req.body.pd_age;
    value_of_items = req.body.value_of_items;
    number_of_convictions = req.body.number_of_convictions;
    gap_from_previous_conviction_by_month = req.body.gap_from_previous_conviction_by_month;
    last_1_month_freq = req.body.last_1_month_freq;
    last_2_month_freq = req.body.last_2_month_freq;
    last_3_month_freq = req.body.last_3_month_freq;
    last_4_month_freq = req.body.last_4_month_freq;
    last_5_month_freq = req.body.last_5_month_freq;
    last_6_month_freq = req.body.last_6_month_freq;

    // set the age range
    if (pd_age < 18) {
      age_range = "R1"
    } else if (pd_age > 17 && pd_age < 21) {
      age_range = "R2"
    } else if (pd_age > 20 && pd_age < 50) {
      age_range = "R3"
    } else {
      age_range = "R4"
    }

    params = {
      condition_of_item,
      cooperation_with_the_enforcement_officers,
      is_item_recovered,
      is_there_appeal,
      is_under_remand,
      state,
      pd_employment_status,
      pd_nationality,
      use_of_violence,
      previous_conviction_records,
      previous_conviction_same_offence,
      relationship_with_victim,
      restitution_of_item,
      pd_marital_status,
      sch_accused_found_guilty_after_ft,
      sch_accused_plead_guilty,
      monthly_income_range_group,
      is_public_interest,
      is_there_any_injury,
      pd_gender,
      age_range,
      number_of_dependants,
      pd_age,
      value_of_items,
      number_of_convictions,
      gap_from_previous_conviction_by_month,
      last_1_month_freq,
      last_2_month_freq,
      last_3_month_freq,
      last_4_month_freq,
      last_5_month_freq,
      last_6_month_freq
    };

    const response = await axios
      .post(BASE_URL_PC380_LOCAL, {
        condition_of_item: params.condition_of_item,
        cooperation_with_the_enforcement_officers: params.cooperation_with_the_enforcement_officers,
        is_item_recovered: params.is_item_recovered,
        is_there_appeal: params.is_there_appeal,
        is_under_remand: params.is_under_remand,
        state: params.state,
        pd_employment_status: params.pd_employment_status,
        pd_nationality: params.pd_nationality,
        use_of_violence: params.use_of_violence,
        previous_conviction_records: params.previous_conviction_records,
        previous_conviction_same_offence: params.previous_conviction_same_offence,
        relationship_with_victim: params.relationship_with_victim,
        restitution_of_item: params.restitution_of_item,
        pd_marital_status: params.pd_marital_status,
        sch_accused_found_guilty_after_ft: params.sch_accused_found_guilty_after_ft,
        sch_accused_plead_guilty: params.sch_accused_plead_guilty,
        monthly_income_range_group: params.monthly_income_range_group,
        is_public_interest: params.is_public_interest,
        is_there_any_injury: params.is_there_any_injury,
        pd_gender: params.pd_gender,
        age_range: params.age_range,
        number_of_dependants: params.number_of_dependants,
        pd_age: params.pd_age,
        value_of_items: params.value_of_items,
        number_of_convictions: params.number_of_convictions,
        gap_from_previous_conviction_by_month: params.gap_from_previous_conviction_by_month,
        last_1_month_freq: params.last_1_month_freq,
        last_2_month_freq: params.last_2_month_freq,
        last_3_month_freq: params.last_3_month_freq,
        last_4_month_freq: params.last_4_month_freq,
        last_5_month_freq: params.last_5_month_freq,
        last_6_month_freq: params.last_6_month_freq
      })
      .catch((error) => {
        logger.error(`[PC380 inferencing] ${error}`);
        logger.info(`[PC380 inferencing] failed ${error}`);
        return {
          data: {
            success: false,
            message: error.message,
            error_code: error.response.status
          },
        };
      });
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data
    };
  },
  predictTester: async (req, res) => {
    model_id = req.query.model_id;
    condition_of_item = req.body.condition_of_item;
    cooperation_with_the_enforcement_officers = req.body.cooperation_with_the_enforcement_officers;
    is_item_recovered = req.body.is_item_recovered;
    is_there_appeal = req.body.is_there_appeal;
    is_under_remand = req.body.is_under_remand;
    state = req.body.state;
    pd_employment_status = req.body.pd_employment_status;
    pd_nationality = req.body.pd_nationality;
    use_of_violence = req.body.use_of_violence;
    previous_conviction_records = req.body.previous_conviction_records;
    previous_conviction_same_offence = req.body.previous_conviction_same_offence;
    relationship_with_victim = req.body.relationship_with_victim;
    restitution_of_item = req.body.restitution_of_item;
    pd_marital_status = req.body.pd_marital_status;
    sch_accused_found_guilty_after_ft = req.body.sch_accused_found_guilty_after_ft;
    sch_accused_plead_guilty = req.body.sch_accused_plead_guilty;
    monthly_income_range_group = req.body.monthly_income_range_group;
    is_public_interest = req.body.is_public_interest;
    is_there_any_injury = req.body.is_there_any_injury;
    pd_gender = req.body.pd_gender;
    number_of_dependants = req.body.number_of_dependants;
    pd_age = req.body.pd_age;
    value_of_items = req.body.value_of_items;
    number_of_convictions = req.body.number_of_convictions;
    gap_from_previous_conviction_by_month = req.body.gap_from_previous_conviction_by_month;
    last_1_month_freq = req.body.last_1_month_freq;
    last_2_month_freq = req.body.last_2_month_freq;
    last_3_month_freq = req.body.last_3_month_freq;
    last_4_month_freq = req.body.last_4_month_freq;
    last_5_month_freq = req.body.last_5_month_freq;
    last_6_month_freq = req.body.last_6_month_freq;

    // set the age range
    if (pd_age < 18) {
      age_range = "R1"
    } else if (pd_age > 17 && pd_age < 21) {
      age_range = "R2"
    } else if (pd_age > 20 && pd_age < 50) {
      age_range = "R3"
    } else {
      age_range = "R4"
    }

    params = {
      condition_of_item,
      cooperation_with_the_enforcement_officers,
      is_item_recovered,
      is_there_appeal,
      is_under_remand,
      state,
      pd_employment_status,
      pd_nationality,
      use_of_violence,
      previous_conviction_records,
      previous_conviction_same_offence,
      relationship_with_victim,
      restitution_of_item,
      pd_marital_status,
      sch_accused_found_guilty_after_ft,
      sch_accused_plead_guilty,
      monthly_income_range_group,
      is_public_interest,
      is_there_any_injury,
      pd_gender,
      age_range,
      number_of_dependants,
      pd_age,
      value_of_items,
      number_of_convictions,
      gap_from_previous_conviction_by_month,
      last_1_month_freq,
      last_2_month_freq,
      last_3_month_freq,
      last_4_month_freq,
      last_5_month_freq,
      last_6_month_freq
    };

    const response = await axios
      .post(BASE_URL_PC380_TESTER_LOCAL + '?model_id=' + model_id, {
        condition_of_item: params.condition_of_item,
        cooperation_with_the_enforcement_officers: params.cooperation_with_the_enforcement_officers,
        is_item_recovered: params.is_item_recovered,
        is_there_appeal: params.is_there_appeal,
        is_under_remand: params.is_under_remand,
        state: params.state,
        pd_employment_status: params.pd_employment_status,
        pd_nationality: params.pd_nationality,
        use_of_violence: params.use_of_violence,
        previous_conviction_records: params.previous_conviction_records,
        previous_conviction_same_offence: params.previous_conviction_same_offence,
        relationship_with_victim: params.relationship_with_victim,
        restitution_of_item: params.restitution_of_item,
        pd_marital_status: params.pd_marital_status,
        sch_accused_found_guilty_after_ft: params.sch_accused_found_guilty_after_ft,
        sch_accused_plead_guilty: params.sch_accused_plead_guilty,
        monthly_income_range_group: params.monthly_income_range_group,
        is_public_interest: params.is_public_interest,
        is_there_any_injury: params.is_there_any_injury,
        pd_gender: params.pd_gender,
        age_range: params.age_range,
        number_of_dependants: params.number_of_dependants,
        pd_age: params.pd_age,
        value_of_items: params.value_of_items,
        number_of_convictions: params.number_of_convictions,
        gap_from_previous_conviction_by_month: params.gap_from_previous_conviction_by_month,
        last_1_month_freq: params.last_1_month_freq,
        last_2_month_freq: params.last_2_month_freq,
        last_3_month_freq: params.last_3_month_freq,
        last_4_month_freq: params.last_4_month_freq,
        last_5_month_freq: params.last_5_month_freq,
        last_6_month_freq: params.last_6_month_freq
      })
      .catch((error) => {
        logger.error(`[PC380 inferencing] ${error}`);
        logger.info(`[PC380 inferencing] failed ${error}`);
        return {
          data: {
            success: false,
            message: error.message,
            error_code: error.response.status
          },
        };
      });
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data
    };
  },
};
