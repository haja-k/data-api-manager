const modelsCtrl = require("../controllers/models");
const path = require("path");
const FormData = require("form-data");
const multer = require("multer");
const utils = require("../plugins/utils");
const dda12 = require("../services/dda12");
const pc380 = require("../services/pc380");
const upload = multer().single("file");
const URL_PREFIX = "/ds/models";
const util = require("util");
const console = require("console");
const logger = require("../plugins/logger")(module);
process.env.BASE_URL_RETRAIN_SUBMIT || BASE_URL_RETRAIN_SUBMIT;

module.exports = function (app) {
  app.get("/health", async (req, res) => {
    /**
      #swagger.tags = [{ "API Health Check" }]
      #swagger.description = "Check if API is running",
      #swagger.responses['200'] = { description: "API call is successful" }  
      #swagger.responses['500'] = { description: "Server Error" }  
    */
    logger.info(`[health-check] Health check triggered`);
    message = "API is running.";
    utils.send(res, { message: "OK", data: message });
  });

  app.get(URL_PREFIX + "/list", async (req, res) => {
    /**
      #swagger.tags = [{ "Model Profiles" }]
      #swagger.description = "List models by section"
      #swagger.parameters['section_id'] = { description: 'Section ID', required: true }
      #swagger.responses['200'] = { description: "API call is successful" }  
      #swagger.responses['500'] = { description: "Server Error" }  
    */
    logger.info(`[list] Sending data to getModelList`);
    result = await modelsCtrl.getModelList(req.query.section_id);
    if (result.success) {
      utils.send(res, { message: "Section models retrieved", data: result.data });
    } else {
      logger.info(`[list] Sending data to getModelList failed`);
      logger.error(`[list] Sending data to getModelList failed`);
      utils.send(res, { message: result.message }, false);
    }
  });

  app.get(URL_PREFIX + "/detail", async (req, res) => {
    /**
      #swagger.tags = [{ "Model Profiles" }]
      #swagger.description = "Get details of a model version by their ID"
      #swagger.parameters['id'] = { description: 'Model Profile ID', required: true }
      #swagger.responses['200'] = { description: "API call is successful" }  
      #swagger.responses['500'] = { description: "Server Error" }  
    */
    logger.info(`[get-detail] Sending data to getModelDetail`);
    result = await modelsCtrl.getModelDetail(req.query.id);
    if (result.success) {
      utils.send(res, { message: "Model details retrieved successfully", data: result.data });
    } else {
      logger.info(`[get-detail] Sending data to getModelDetail failed`);
      logger.error(`[get-detail] Sending data to getModelDetail failed`);
      utils.send(res, { message: result.message }, false);
    }
  });

  app.get(URL_PREFIX + "/get-status", async (req, res) => {
    /**
      #swagger.tags = [{ "Model Profiles" }]
      #swagger.description = "Get status of a model by their ID"
      #swagger.parameters['id'] = { description: 'Model Profile ID' }
      #swagger.responses['200'] = { description: "API call is successful" }  
      #swagger.responses['500'] = { description: "Server Error" }  
    */
    logger.info(`[get-status] Sending data to getModelStatus`);
    result = await modelsCtrl.getModelStatus(req.query.id);
    if (result.success) {
      utils.send(res, { data: result.data, message: result.message });
    } else {
      logger.info(`[get-status] Sending data to getModelStatus failed`);
      logger.error(`[get-status] Sending data to getModelStatus failed`);
      utils.send(res, { message: result.message }, false);
    }
  });

  app.get(URL_PREFIX + "/dda12/get-active", async (req, res) => {
    /**
      #swagger.tags = [{ "Back-End Usage Only" }]
      #swagger.description = "Get an active model for DDA12"
      #swagger.responses['200'] = { description: "API call is successful" }  
      #swagger.responses['500'] = { description: "Server Error" }  
    */
    logger.info(`[DDA12] Sending data to getActiveModelDDA12`);
    result = await modelsCtrl.getActiveModelDDA12();
    if (result.success) {
      utils.send(res, { message: result.message, data: result.data });
    } else {
      logger.info(`[DDA12] Sending data to getActiveModelDDA12 failed`);
      logger.error(`[DDA12] Sending data to getActiveModelDDA12 failed`);
      utils.send(res, { message: result.message }, false);
    }
  });

  app.get(URL_PREFIX + "/pc380/get-active", async (req, res) => {
    /**
      #swagger.tags = [{ "Back-End Usage Only" }]
      #swagger.description = "Get an active model for PC380"
      #swagger.responses['200'] = { description: "API call is successful" }  
      #swagger.responses['500'] = { description: "Server Error" }  
    */
    logger.info(`[PC380] Sending data to getActiveModelPC380`);
    result = await modelsCtrl.getActiveModelPC380();
    if (result.success) {
      utils.send(res, { message: result.message, data: result.data });
    } else {
      logger.info(`[PC380] Sending data to getActiveModelPC380 failed`);
      logger.error(`[PC380] Sending data to getActiveModelPC380 failed`);
      utils.send(res, { message: result.message }, false);
    }
  });

  app.get(URL_PREFIX + "/get-active-model-list", async (req, res) => {
    /**
      #swagger.tags = [{ "Model Profiles" }]
      #swagger.description = "Get active models for all sections"
      #swagger.responses['200'] = { description: "API call is successful" }  
      #swagger.responses['500'] = { description: "Server Error" }  
    */
    logger.info(`[active-models] Sending data to getAllActiveModel`);
    result = await modelsCtrl.getAllActiveModel();
    if (result.success) {
      utils.send(res, { message: result.message, data: result.data });
    } else {
      logger.info(`[active-models] Sending data to getAllActiveModel error`);
      logger.error(`[active-models] Sending data to getAllActiveModel error`);
      utils.send(res, { message: result.message }, false);
    }
  });

  app.post(URL_PREFIX + "/set-active", async (req, res) => {
    /**
      #swagger.tags = [{ "Model Profiles" }]
      #swagger.description = "Set a model to active using their ID"
      #swagger.parameters['id'] = { description: 'Model Profile ID', required: true }
      #swagger.parameters['section_id'] = { description: 'Section ID', required: true }
      #swagger.responses['200'] = { description: "API call is successful" }  
      #swagger.responses['500'] = { description: "Server Error" }  
    */
    logger.info(`[set-active] Sending data to setActiveModel`);
    result = await modelsCtrl.setActiveModel(req);
    if (result.success) {
      utils.send(res, { data: result.data });
    } else {
      logger.info(`[set-active] Sending data to setActiveModel failed`);
      logger.error(`[set-active] Sending data to setActiveModel failed`);
      utils.send(res, { message: result.message }, false);
    }
  });

  app.get(URL_PREFIX + "/feature-list", async (req, res) => {
    /**
      #swagger.tags = [{ "Back-End Usage Only" }]
      #swagger.description = "List all features used for training by section"
      #swagger.parameters['section_id'] = { description: 'Section ID', required: true }
      #swagger.responses['200'] = { description: "API call is successful" }  
      #swagger.responses['500'] = { description: "Server Error" }  
    */
    logger.info(`[feature-list] Sending data to getFeatureList`);
    result = await modelsCtrl.getFeatureList(req.query.section_id);
    if (result.success) {
      utils.send(res, { message: result.message, data: result.data });
    } else {
      logger.info(`[feature-list] Sending data to getFeatureList failed`);
      logger.error(`[feature-list] Sending data to getFeatureList failed`);
      utils.send(res, { message: result.message }, false);
    }
  });

  app.post(URL_PREFIX + "/add-feature-list", async (req, res) => {
    /**
      #swagger.tags = [{ "Back-End Usage Only" }]
      #swagger.description = "Add a feature for training by section"
      #swagger.parameters['section_id'] = { description: 'Section ID', required: true }
      #swagger.parameters['feature_name'] = { description: 'New feature name', required: true }
      #swagger.parameters['feature_type'] = { enum: [ "cat_input_features", "num_input_features", "target_features", "extra_features"], description: 'New feature type', required: true }
      #swagger.responses['200'] = { description: "API call is successful" }  
      #swagger.responses['500'] = { description: "Server Error" }  
    */
    section_id = req.query.section_id;
    feature_name = req.query.feature_name;
    feature_type = req.query.feature_type;
    logger.info(`[add-feature-list] Sending data to addFeatureList`);
    result = await modelsCtrl.addFeatureList(req, res);
    if (result.success) {
      utils.send(res, { message: result.message, data: result.data });
    } else {
      logger.info(`[add-feature-list] Sending data to addFeatureList failed`);
      logger.error(`[add-feature-list] Sending data to addFeatureList failed`);
      utils.send(res, { message: result.message }, false);
    }
  });

  app.put(URL_PREFIX + "/delete-feature-list", async (req, res) => {
    /**
      #swagger.tags = [{ "Back-End Usage Only" }]
      #swagger.description = "Delete a feature from training features list"
      #swagger.parameters['section_id'] = { description: 'Section ID', required: true }
      #swagger.parameters['feature_id'] = { description: 'Feature ID', required: true }
      #swagger.responses['200'] = { description: "API call is successful" }  
      #swagger.responses['500'] = { description: "Server Error" }  
    */
    logger.info(
      `[delete-feature-list] Sending features for deletion to deleteFeatureList`
    );
    result = await modelsCtrl.deleteFeatureList(req, res);
    if (result.success) {
      utils.send(res, { message: result.message });
    } else {
      logger.info(
        `[delete-feature-list] Sending features for deletion to deleteFeatureList failed`
      );
      logger.error(
        `[delete-feature-list] Sending features for deletion to deleteFeatureList failed`
      );
      utils.send(res, { message: result.message }, false);
    }
  });

  app.post(URL_PREFIX + "/retrain/dda12/data", async (req, res) => {
    /** 
      #swagger.tags = [{ "AI Retraining" }]
      #swagger.description = "Send data for DDA12 model self learning" 
      #swagger.parameters['use_immediately'] = {
        required: true,
        type: 'boolean'
      }
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Some description...',
        schema: [
            {
            id: 0,
            drug_type: "string",
            pd_nationality: "string",
            pd_gender: "string",
            sch_accused_plead_guilty: "string",
            ds_imprisonment_effective_on: "string",
            pd_repeated_offence: "string",
            state: "string",
            weight_of_drug: 0.0,
            pd_age: 0,
            ds_fine: "string",
            ds_fine_prison_by_days: "string",
            ds_imprisonment_by_days: "string",
            ds_chk_fine: "string",
            ds_chk_imprisonment: "string",
            ds_chk_bond: "string",
            cas_case_no: "string",
            sch_date: "string",
            sentence_type: "string",
            freq_last_1_month: 0.0,
            freq_last_2_month: 0.0,
            freq_last_3_month: 0.0,
            freq_last_4_month: 0.0,
            freq_last_5_month: 0.0,
            freq_last_6_month: 0.0,
            rampancy_last_1_month: 0.0,
            rampancy_last_2_month: 0.0,
            rampancy_last_3_month: 0.0,
            rampancy_last_4_month: 0.0,
            rampancy_last_5_month: 0.0
          }
        ]
      } 
      #swagger.responses['200'] = { description: "API call is successful" } 
      #swagger.responses['422'] = { description: "Unprocessable entity. Wrong data format" }  
      #swagger.responses['500'] = { description: "Server Error" }  
    */
    try {
      logger.info(`[DDA12] Sending data for retraining`);
      const result = await modelsCtrl.dataRetrain(req, res);
      utils.send(res, { message: result.message }, result.success);
    } catch (error) {
      console.log(error);
      logger.info(`[DDA12] Sending data for retraining failed`);
      logger.error(`[DDA12] Sending data for retraining failed`);
      return utils.send(res, { message: error }, false);
    }
  });

  app.post(URL_PREFIX + "/retrain/pc380/data", async (req, res) => {
    /** 
      #swagger.tags = [{ "AI Retraining" }]
      #swagger.description = "Send data for PC380 model self learning" 
      #swagger.parameters['use_immediately'] = {
        required: true,
        type: 'boolean'
      }
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Some description...',
        schema: [
          {
            id: 0,
            sch_date: "datetime",
            cas_case_no: "string",
            condition_of_item: "string",
            cooperation_with_the_enforcement_officers: "string",
            is_item_recovered: "string",
            is_there_appeal: "string",
            is_under_remand: "string",
            state: "string",
            pd_employment_status: "string",
            pd_nationality: "string",
            use_of_violence: "string",
            previous_conviction_records: "string",
            previous_conviction_same_offence: "string",
            relationship_with_victim: "string",
            restitution_of_item: "string",
            pd_marital_status: "string",
            sch_accused_found_guilty_after_ft: "string",
            sch_accused_plead_guilty: "string",
            monthly_income_range_group: "string",
            is_public_interest: "string",
            is_there_any_injury: "string",
            pd_gender: "string",
            age_range: "string",
            number_of_dependants: 0,
            pd_age: 0,
            value_of_items: 0.0,
            number_of_convictions: "string",
            gap_from_previous_conviction_by_month: "string",
            freq_last_1_month: 0.0,
            freq_last_2_month: 0.0,
            freq_last_3_month: 0.0,
            freq_last_4_month: 0.0,
            freq_last_5_month: 0.0,
            freq_last_6_month: 0.0,
            sentence_type_pc380: "string",
            ds_fine: "string",
            ds_fine_prison_by_days: "string",
            ds_imprisonment_by_days: "string",
            ds_whipping: "string",
            ds_bond_amt: "string"
          }
        ]
      } 
    */
    try {
      logger.info(`[PC380] Sending data for retraining`);
      const result = await modelsCtrl.dataRetrainPC380(req, res);
      utils.send(res, { message: result.message }, result.success);
    } catch (error) {
      console.log(error);
      logger.info(`[PC380] Sending data for retraining failed`);
      logger.error(`[PC380] Sending data for retraining failed`);
      return utils.send(res, { message: error }, false);
    }
  });

  app.post(URL_PREFIX + "/retrain/submit-result", async (req, res) => {
    /**
      #swagger.tags = [{ "Back-End Usage Only" }]
      #swagger.description = "Send training result into the database" 
      #swagger.responses['200'] = { description: "API call is successful" }  
      #swagger.responses['500'] = { description: "Server Error" }  
    */
    try {
      mp_id = req.query.id;
      data = req.body;

      logger.info(`[submit-result] Sending data to retrainSubmitResult`);

      result = await modelsCtrl.retrainSubmitResult(mp_id, data.success, data);
      if (result.success) {
        utils.send(res, {
          message: `Submit result for Model Profile ID: ${mp_id} successful.`,
        });
      } else {
        utils.send(res, { message: result.message }, false);
      }
    } catch (error) {
      console.log(error);
      logger.info(`[submit-result] Sending data to retrainSubmitResult failed`);
      logger.error(
        `[submit-result] Sending data to retrainSubmitResult failed`
      );
      return utils.send(res, { message: error }, false);
    }
  });

  app.post(URL_PREFIX + "/dda12/predict", async (req, res) => {
    /**
      #swagger.tags = [{ "Inferencing" }]  
      #swagger.description = "Inferencing for DDA12"
      #swagger.parameters['data'] = {
        in: 'body',
        schema:{
          drug_type: 'methamphetamine',
          is_citizen: 'y',
          pd_gender: 'male',
          sch_accused_plead_guilty: 'y',
          pd_repeated_offence: 'n',
          state: 'sarawak',
          weight_of_drug: 0.25,
          pd_age: 25,
          last_1_month_freq: 38,
          last_2_month_freq: 74,
          last_3_month_freq: 30,
          last_4_month_freq: 40,
          last_5_month_freq: 32,
          last_6_month_freq: 67
        }  
      } 
      #swagger.responses['200'] = { description: "API call is successful" }  
      #swagger.responses['500'] = { description: "Server Error" }  
    */
    try {
      logger.info(`[DDA12 inferencing] Sending data to predict`);

      data = req.body;
      drug_type = data.drug_type;
      is_citizen = data.is_citizen;
      pd_gender = data.pd_gender;
      sch_accused_plead_guilty = data.sch_accused_plead_guilty;
      pd_repeated_offence = data.pd_repeated_offence;
      state = data.state;
      weight_of_drug = data.weight_of_drug;
      pd_age = data.pd_age;
      last_1_month_freq = data.last_1_month_freq;
      last_2_month_freq = data.last_2_month_freq;
      last_3_month_freq = data.last_3_month_freq;
      last_4_month_freq = data.last_4_month_freq;
      last_5_month_freq = data.last_5_month_freq;
      last_6_month_freq = data.last_6_month_freq;

      let response = await dda12.predict(req, res);
      utils.send(
        res,
        { data: response.data, message: response.message },
        response.success
      );
    } catch (error) {
      console.log(error);
      logger.info(`[DDA12 inferencing] Sending data to predict failed`);
      logger.error(`[DDA12 inferencing] Sending data to predict failed`);
      return utils.send(res, { message: error }, false);
    }
  });

  app.post(URL_PREFIX + "/pc380/predict", async (req, res) => {
    /**
      #swagger.tags = [{ "Inferencing" }]  
      #swagger.description = "Inferencing for PC380"
      #swagger.parameters['data'] = {
        in: 'body',
        schema:{
          condition_of_item: 'good',
          cooperation_with_the_enforcement_officers: 'n',
          is_item_recovered: 'y',
          is_there_appeal: 'y',
          is_under_remand: 'y',
          state: 'sarawak',
          pd_employment_status: 'n',
          pd_nationality: 'y',
          use_of_violence: 'y',
          previous_conviction_records: 'y',
          previous_conviction_same_offence: 'y',
          relationship_with_victim: 'family members',
          restitution_of_item: 'n',
          pd_marital_status: 'married',
          sch_accused_found_guilty_after_ft: 'y',
          sch_accused_plead_guilty: 'y',
          monthly_income_range_group: 'B40',
          is_public_interest: 'no details available',
          is_there_any_injury: 'y',
          pd_gender: 'male',
          number_of_dependants: 1,
          pd_age: 32,
          value_of_items: 1100.02,
          number_of_convictions: "9",
          gap_from_previous_conviction_by_month: "no details available",
          last_1_month_freq: 12,
          last_2_month_freq: 3,
          last_3_month_freq: 44,
          last_4_month_freq: 21,
          last_5_month_freq: 10,
          last_6_month_freq: 8
        }  
      } 
      #swagger.responses['200'] = { description: "API call is successful" }  
      #swagger.responses['500'] = { description: "Server Error" }  
    */
    try {
      logger.info(`[PC380 inferencing] Sending data to predict`);

      data = req.body;
      condition_of_item = data.condition_of_item;
      cooperation_with_the_enforcement_officers =
        data.cooperation_with_the_enforcement_officers;
      is_item_recovered = data.is_item_recovered;
      is_there_appeal = data.is_there_appeal;
      is_under_remand = data.is_under_remand;
      state = data.state;
      pd_employment_status = data.pd_employment_status;
      pd_nationality = data.pd_nationality;
      use_of_violence = data.use_of_violence;
      previous_conviction_records = data.previous_conviction_records;
      previous_conviction_same_offence = data.previous_conviction_same_offence;
      relationship_with_victim = data.relationship_with_victim;
      restitution_of_item = data.restitution_of_item;
      pd_marital_status = data.pd_marital_status;
      sch_accused_found_guilty_after_ft =
        data.sch_accused_found_guilty_after_ft;
      sch_accused_plead_guilty = data.sch_accused_plead_guilty;
      monthly_income_range_group = data.monthly_income_range_group;
      is_public_interest = data.is_public_interest;
      is_there_any_injury = data.is_there_any_injury;
      pd_gender = data.pd_gender;
      number_of_dependants = data.number_of_dependants;
      pd_age = data.pd_age;
      value_of_items = data.value_of_items;
      number_of_convictions = data.number_of_convictions;
      gap_from_previous_conviction_by_month =
        data.gap_from_previous_conviction_by_month;
      last_1_month_freq = data.last_1_month_freq;
      last_2_month_freq = data.last_2_month_freq;
      last_3_month_freq = data.last_3_month_freq;
      last_4_month_freq = data.last_4_month_freq;
      last_5_month_freq = data.last_5_month_freq;
      last_6_month_freq = data.last_6_month_freq;

      let response = await pc380.predict(req, res);

      utils.send(
        res,
        {
          data: response.data.data,
          message: response.message,
          description: response.data.description,
          error_code: response.data.error_code,
        },
        response.success
      );
    } catch (error) {
      console.log(error);
      logger.info(`[PC380 inferencing] Sending data to predictTester failed`);
      logger.error(`[PC380 inferencing] Sending data to predictTester failed`);
      return utils.send(res, { message: error }, false);
    }
  });

  app.post(URL_PREFIX + "/pc380/predict-tester", async (req, res) => {
    /**
      #swagger.tags = [{ "Inferencing" }]  
      #swagger.description = "Inferencing for PC380 models by their ID"
      #swagger.parameters['model_id'] = { description: 'Model ID', required: true }
      #swagger.parameters['data'] = {
        in: 'body',
        schema:{
          condition_of_item: 'good',
          cooperation_with_the_enforcement_officers: 'n',
          is_item_recovered: 'y',
          is_there_appeal: 'y',
          is_under_remand: 'y',
          state: 'sarawak',
          pd_employment_status: 'n',
          pd_nationality: 'y',
          use_of_violence: 'y',
          previous_conviction_records: 'y',
          previous_conviction_same_offence: 'y',
          relationship_with_victim: 'family members',
          restitution_of_item: 'n',
          pd_marital_status: 'married',
          sch_accused_found_guilty_after_ft: 'y',
          sch_accused_plead_guilty: 'y',
          monthly_income_range_group: 'B40',
          is_public_interest: 'no details available',
          is_there_any_injury: 'y',
          pd_gender: 'male',
          number_of_dependants: 1,
          pd_age: 32,
          value_of_items: 1100.02,
          number_of_convictions: "9",
          gap_from_previous_conviction_by_month: "no details available",
          last_1_month_freq: 12,
          last_2_month_freq: 3,
          last_3_month_freq: 44,
          last_4_month_freq: 21,
          last_5_month_freq: 10,
          last_6_month_freq: 8
        }  
      } 
      #swagger.responses['200'] = { description: "API call is successful" }  
      #swagger.responses['500'] = { description: "Server Error" }  
    */
    try {
      logger.info(`[PC380 inferencing beta] Sending data to predictTester`);

      data = req.body;
      condition_of_item = data.condition_of_item;
      cooperation_with_the_enforcement_officers =
        data.cooperation_with_the_enforcement_officers;
      is_item_recovered = data.is_item_recovered;
      is_there_appeal = data.is_there_appeal;
      is_under_remand = data.is_under_remand;
      state = data.state;
      pd_employment_status = data.pd_employment_status;
      pd_nationality = data.pd_nationality;
      use_of_violence = data.use_of_violence;
      previous_conviction_records = data.previous_conviction_records;
      previous_conviction_same_offence = data.previous_conviction_same_offence;
      relationship_with_victim = data.relationship_with_victim;
      restitution_of_item = data.restitution_of_item;
      pd_marital_status = data.pd_marital_status;
      sch_accused_found_guilty_after_ft =
        data.sch_accused_found_guilty_after_ft;
      sch_accused_plead_guilty = data.sch_accused_plead_guilty;
      monthly_income_range_group = data.monthly_income_range_group;
      is_public_interest = data.is_public_interest;
      is_there_any_injury = data.is_there_any_injury;
      pd_gender = data.pd_gender;
      number_of_dependants = data.number_of_dependants;
      pd_age = data.pd_age;
      value_of_items = data.value_of_items;
      number_of_convictions = data.number_of_convictions;
      gap_from_previous_conviction_by_month =
        data.gap_from_previous_conviction_by_month;
      last_1_month_freq = data.last_1_month_freq;
      last_2_month_freq = data.last_2_month_freq;
      last_3_month_freq = data.last_3_month_freq;
      last_4_month_freq = data.last_4_month_freq;
      last_5_month_freq = data.last_5_month_freq;
      last_6_month_freq = data.last_6_month_freq;

      let response = await pc380.predictTester(req, res);

      utils.send(
        res,
        {
          data: response.data.data,
          message: response.message,
          description: response.data.description,
          error_code: response.data.error_code,
        },
        response.success
      );
    } catch (error) {
      console.log(error);
      logger.info(
        `[PC380 inferencing beta] Sending data to predictTester failed`
      );
      logger.error(
        `[PC380 inferencing beta] Sending data to predictTester failed`
      );
      return utils.send(res, { message: error }, false);
    }
  });
};
