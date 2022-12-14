const {
  dataset_detail,
  feature_list,
  model_profile,
  sub_model_profile,
  sub_model_type,
  sub_model_metric,
  model_feature_list,
  metric_type,
  section,
  model_hyperparameter,
  sequelize,
  log_retrain_submit,
} = require("../models");
const global = require("../plugins/version");
const ds_version = global.version;
const DDA12Svc = require("../services/dda12");
const PC380Svc = require("../services/pc380");
const logger = require("../plugins/logger")(module);
const utils = require("../plugins/utils");
const { Op } = require("sequelize");

var self = (module.exports = {
  getModelList: async (input_section) => {
    try {
      const selected_section = await section.findOne({
        where: { id: input_section },
      });

      if (!selected_section) {
        return {
          success: false,
          message: `Section ID ${input_section} is not found in database.`,
        };
      }

      const model_profiles = await model_profile.findAll({
        where: { section_id: selected_section.id },
      });

      return { success: true, data: model_profiles };
    } catch (error) {
      return { success: false, message: error };
    }
  },
  getFeatureList: async (input_section) => {
    try {
      const valid_features = await feature_list.findAll({
        where: { section_id: input_section, isValid: true },
        attributes: ["id", "feature_name", "feature_type"],
      });
      if (!valid_features) {
        return {
          success: false,
          message: `Section ID of section ${input_section} is not found.`,
        };
      }
      if (valid_features.length == 0) {
        return {
          success: false,
          message: `Valid features not found for section ${input_section}`,
        };
      } else {
        return {
          success: true,
          message: `Valid features for section ${input_section} retrieved successfully`,
          data: valid_features,
        };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  addFeatureList: async (req, res) => {
    // NOTE: maybe add another table for ordering the features?
    try {
      const selected_section = await section.findOne({
        where: { id: req.query.section_id },
        attributes: ["id", "section_name"],
      });
      if (!selected_section) {
        return {
          success: false,
          message: `Section ID of section ${req.query.section.toUpperCase()} is not found.`,
        };
      } else {
        section_id = selected_section.dataValues.id;
        section_name = selected_section.dataValues.section_name;
      }
      const check_duplicated_features = await feature_list.findOne({
        where: {
          feature_name: req.query.feature_name,
          feature_type: req.query.feature_type,
          section_id: req.query.section_id
        },
        attributes: ["isValid", "id"],
      });
      if (check_duplicated_features) {
        if (check_duplicated_features.dataValues.isValid == false) {
          await feature_list.update(
            { isValid: true },
            { where: { id: check_duplicated_features.dataValues.id } }
          );
          return {
            success: true,
            message: `Feature '${req.query.feature_name}' already exists but invalid. It is now set as valid.`,
          };
        } else {
          return {
            success: false,
            message: `Feature '${req.query.feature_name}' already exists and still valid.`,
          };
        }
      }
      isValid = true;
      await feature_list.create({
        section_id: section_id,
        feature_name: req.query.feature_name,
        feature_type: req.query.feature_type,
        isValid: isValid,
      });
      return {
        success: true,
        message: `Training feature '${req.query.feature_name}' for section ${section_name} has been added successfully.`,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  deleteFeatureList: async (req, res) => {
    try {
      var feature_check = await feature_list.findOne({
        where: { id: req.query.feature_id, section_id: req.query.section_id },
      });
      if (!feature_check) {
        return {
          success: false,
          message: `Feature with ID: ${req.query.feature_id} is not found.`,
        };
      }
      if (feature_check.isValid == false) {
        return {
          success: false,
          message: `Feature ${req.query.feature_id} is already set to invalid!`,
        };
      } else {
        if (feature_check.isValid != true) {
          return {
            success: false,
            message: `Feature ${req.query.feature_id} cannot be set invalid.`,
          };
        }
      }
      await feature_list.update(
        { isValid: false },
        { where: { id: req.query.feature_id } }
      );
      feature_check.isValid = false;
      feature_check.save();
      return {
        success: true,
        data: feature_check.toJSON(),
        message: `Set feature ID ${req.query.feature_id} to invalid succeeded.`,
      };
    } catch (error) {
      return { success: error.success, message: error.message };
    }
  },
  getModelDetail: async (mp_id) => {
    try {
      var model_section = await model_profile.findOne({
        where: { id: mp_id },
        include: [
          {
            model: section,
            attributes: ["section_name"],
          }]
        })
        
      if (model_section.section.dataValues.section_name == "dda12") {
        var mp = await model_profile.findOne({
          where: { id: mp_id },
          include: [
            {
              model: section,
              attributes: ["section_name"],
            },
            {
              model: dataset_detail,
              attributes: ["start_date", "end_date", "total_cases"],
            },
            {
              model: sub_model_profile,
              attributes: ["id"],
              include: [
                {
                  model: sub_model_type,
                  attributes: ["model_type"],
                },
                {
                  model: sub_model_metric,
                  attributes: ["metric_value"],
                  include: [
                    {
                      model: metric_type,
                      attributes: ["metric_name"],
                      where: {
                        metric_name: {
                          [Op.or]: {
                            [Op.startsWith]: "mae",
                            [Op.substring]: "rmse",
                            [Op.endsWith]: "f1",
                            [Op.like]: "accuracy"
                          }
                        }
                      }
                    },
                  ],
                },
              ],
            },
          ],
        });
      } else {
        var mp = await model_profile.findOne({
          where: { id: mp_id },
          include: [
            {
              model: section,
              attributes: ["section_name"],
            },
            {
              model: dataset_detail,
              attributes: ["start_date", "end_date", "total_cases"],
            },
            {
              model: sub_model_profile,
              attributes: ["id"],
              include: [
                {
                  model: sub_model_type,
                  attributes: ["model_type"],
                  where: {
                    model_type: {
                      [Op.or]: {
                        [Op.endsWith]: "Regression",
                        [Op.startsWith]: "Sentencing",
                      }
                    },
                  },
                },
                {
                  model: sub_model_metric,
                  attributes: ["metric_value"],
                  include: [
                    {
                      model: metric_type,
                      attributes: ["metric_name"],
                      where: { 
                        metric_name: {
                          [Op.or]: {
                            [Op.startsWith]: "mae",
                            [Op.substring]: "rmse",
                            [Op.endsWith]: "f1",
                            [Op.like]: "accuracy"
                          }
                        }
                      }
                    },
                  ],
                },
              ],
            },
          ],
        });
      }
      if (!mp) {
        return {
          success: false,
          message: `Model with ID: ${mp_id} is not found.`,
        };
      }

      mp = mp.toJSON();
      mp.section = mp.section.section_name;
      mp.sub_model_profiles.forEach((smp) => {
        smp.sub_model_type = smp.sub_model_type.model_type;
        smp.sub_model_metrics.forEach((smm) => {
          smm.metric_type = smm.metric_type.metric_name;
        });
      });

      return { success: true, data: mp };
    } catch (error) {
      console.log(error);
      return { success: false, message: error };
    }
  },
  getModelStatus: async (mp_id) => {
    try {
      let mp = await model_profile.findOne({
        where: { id: mp_id },
        raw: true,
        attributes: ["training_status", "log_retrain_submits.response"],
        include: [
          {
            model: log_retrain_submit,
            attributes: [],
          },
        ],
      });

      if (!mp) {
        return {
          success: false,
          message: `Model with ID: ${mp_id} is not found.`,
        };
      }

      if (mp.training_status != "failed") {
        var key = "response"
        delete mp[key]
      } else {
        if (mp.response) {
          mp.response = JSON.parse(mp.response)["message"];
        }
      }

      return { success: true, data: mp, message: "Model status retrieved successfully"};
    } catch (error) {
      return { success: false, message: error };
    }
  },
  setActiveModel: async (req, sectionid, force) => {
    try {
      modelid = req.query.id
      sectionid = req.query.section_id
    } catch (error) {
      modelid = req
    }
    try {
      var mp = await model_profile.findOne({
        where: { id: modelid, section_id: sectionid},
        attributes: ["id", "training_status", "section_id", "activated_on"],
      });

      if (!mp) {
        return {
          success: false,
          message: `Model with ID ${modelid} under section ${sectionid} is not found `,
        };
      }

      if (mp.training_status == "in_use") {
        return { success: false, message: `Model is already active!` };
      } else {
        if (mp.training_status != "trained" && !force) {
          return {
            success: false,
            message: `Model cannot be set active with training status: ${mp.training_status}`,
          };
        }
      }
      // update all currently active model
      await model_profile.update(
        { training_status: "trained" },
        { where: { training_status: "in_use", section_id: sectionid } }
      );

      mp.training_status = "in_use";
      mp.activated_on = new Date();

      mp.save();

      return {
        success: true,
        data: mp.toJSON(),
        message: `Set active model ID: ${modelid} success.`,
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: error };
    }
  },
  dataRetrain: async (req, res) => {
    section_code = "dda12"
    try {
      const selected_section = await section.findOne({
        where: { section_name: section_code },
      });
      if (!selected_section) {
        return {
          success: false,
          message: `Section ID of section ${input_section} is not found.`,
        };
      }
      newMp = await model_profile.create(
        {
          training_status: "scheduled_for_training",
          ds_version: ds_version,
          section_id: selected_section.id,
          sub_model_profiles: [
            { sm_type_id: 1 },
            { sm_type_id: 2 },
            { sm_type_id: 3 },
          ],
        },
        {
          include: [sub_model_profile],
        }
      );
      result = await DDA12Svc.retraining(req, res, newMp.id, selected_section.id);
      return {
        success: result.success,
        message: result.success
          ? `Model ID: ${newMp.id} is scheduled for training.`
          : result.message,
      };
    } catch (error) {
      console.log(error);
      logger.error(`[Data retrain uploadData] ${error}`);
      return { success: false, message: error };
    }
  },
  dataRetrainPC380: async (req, res) => {
    logger.info(`[PC380] dataRetrainPC380 triggered`);
    section_code = "pc380";
    try {
      const selected_section = await section.findOne({
        where: { section_name: section_code },
      });
      if (!selected_section) {
        return {
          success: false,
          message: `Section ID of section ${section_code} is not found.`,
        };
      }
      newMp = await model_profile.create(
        {
          training_status: "scheduled_for_training",
          section_id: selected_section.id,
          sub_model_profiles: [
            { sm_type_id: 1 },
            { sm_type_id: 4 },
            { sm_type_id: 5 },
            { sm_type_id: 6 },
            { sm_type_id: 7 },
            { sm_type_id: 8 },
            { sm_type_id: 9 },
            { sm_type_id: 10 },
            { sm_type_id: 11 },
            { sm_type_id: 12 },
            { sm_type_id: 13 },
            { sm_type_id: 14 },
            { sm_type_id: 15 },
            { sm_type_id: 16 },
            { sm_type_id: 17 },
            { sm_type_id: 18 },
            { sm_type_id: 19 },
            { sm_type_id: 20 },
            { sm_type_id: 21 },
            { sm_type_id: 22 },
            { sm_type_id: 23 },
            { sm_type_id: 24 },
            { sm_type_id: 25 },
            { sm_type_id: 26 },
            { sm_type_id: 27 },
          ],
        },
        {
          include: [sub_model_profile],
        }
      );
      result = await PC380Svc.retraining(
        req,
        res,
        newMp.id,
        selected_section.id
      );
      return {
        success: result.success,
        message: result.success
          ? `Model ID: ${newMp.id} is scheduled for training.`
          : result.message,
      };
    } catch (error) {
      console.log(error);
      logger.error(`[Data retrain uploadData] ${error}`);
      return { success: false, message: error };
    }
  },
  retrainSubmitResult: async (mp_id, response_status, response_data) => {
    logger.info(`[PC380] retrainSubmitResult triggered`);
    const success = response_status == "true";
    const retrain_data = response_data.data;
    const dataset_details = retrain_data["dataset"];
    try {
      await log_retrain_submit.create({
        mp_id: mp_id,
        response: JSON.stringify(response_data),
        status: response_status,
      });
      logger.info(`[PC380] retrainSubmitResult - log_retrain_submit record created`);
      if (success) {
        await dataset_detail.create({
          mp_id: mp_id,
          case_list: dataset_details["dataset_details"]["case_number_list"],
          start_date: dataset_details["dataset_details"]["start_date"],
          end_date: dataset_details["dataset_details"]["end_date"],
          total_cases: dataset_details["dataset_details"]["total_cases"],
          total_case_fine:
            dataset_details["dataset_details"]["total_case_fine"],
          total_case_imprisonment:
            dataset_details["dataset_details"]["total_case_imprisonment"],
          total_case_bond:
            dataset_details["dataset_details"]["total_case_bond"],
          total_case_whipping:
            dataset_details["dataset_details"]["total_case_whipping"],
        });
        logger.info(`[PC380] retrainSubmitResult - dataset_detail record created`);

        var use_immediately = utils.parseBool(retrain_data["use_immediately"]);
        const result_data = retrain_data["data"];
        return model_profile.findByPk(mp_id).then(async (mp) => {
          if (!mp) {
            return {
              success: false,
              message: `Model with ID: ${mp_id} not found`,
            };
          }

          training_status = use_immediately ? "in_use" : "trained";
          let ds_version_model = ds_version.replace("x", mp.id);
          if (use_immediately) {
            await mp.update({
              model_version: mp.id,
              ds_version: ds_version_model,
              trained_on: new Date(),
            });
            await self.setActiveModel(mp_id, mp.dataValues.section_id, true);
            logger.info(`[PC380] retrainSubmitResult - update model status to in_use`);
          } else {
            await mp.update({
              model_version: mp.id,
              ds_version: ds_version_model,
              training_status: training_status,
              trained_on: new Date(),
            });
            logger.info(`[PC380] retrainSubmitResult - update model status to  ${training_status}`);
          }

          const saveHyperparametersResult = await self._saveHyperparameters(
            mp.id,
            result_data
          );
          if (!saveHyperparametersResult.success) {
            logger.error(saveHyperparametersResult.message);
          }

          const saveFeatureList = await self._saveFeatureList(
            mp.id,
            result_data
          );
          if (!saveFeatureList.success) {
            logger.error(saveFeatureList.message);
          }

          const savePerformanceMetricsResult =
            await self._savePerformanceMetrics(mp.id, result_data);
          if (!savePerformanceMetricsResult.success) {
            logger.error(savePerformanceMetricsResult.message);
          }

          return { success: true };
        });
      } else {
        let mp = await model_profile.findByPk(mp_id);

        if (!mp) {
          return {
            success: false,
            message: `Model with ID: ${mp_id} not found`,
          };
        }

        await mp.update({
          model_version: mp.id,
          training_status: "failed",
          trained_on: new Date(),
        });

        return { success: true };
      }
    } catch (error) {
      console.log(error);
      logger.error(`[Retrain callback] ${error}`);
      return { success: false, message: error };
    }
  },
  _saveHyperparameters: async (mp_id, result_data) => {
    try {
      const mp = model_profile.findByPk(mp_id);
      logger.info(`[PC380] _saveHyperparameters triggered`);
      if (!mp) {
        return {
          success: false,
          message: `Model with ID: ${mp_id} not found`,
        };
      }

      for await (const [model_type, model_data] of Object.entries(
        result_data
      )) {
        // NOTE: error is here
        let updated_model_type = model_type.replaceAll("_", " ");
        sm_type = await sub_model_type.findOne({
          where: { model_type: updated_model_type },
        });

        if (!sm_type) {
          return {
            success: false,
            message: `Sub model type of type: ${model_type} not found`,
          };
        }

        smp = await sub_model_profile.findOne({
          where: {
            mp_id: mp_id,
            sm_type_id: sm_type.id,
          },
        });

        if (!smp) {
          return {
            success: false,
            message: `Sub model profile of ID: ${mp_id} and model type ${model_type} not found`,
          };
        }

        let transaction;

        transaction = await sequelize.transaction();

        for await (const [hyper_type, hyper_value] of Object.entries(
          model_data["grid_search_result"]
        )) {
          await model_hyperparameter.create(
            {
              smp_id: smp.id,
              hyperparameter_value: hyper_value,
              m_hyper_type: hyper_type,
            },
            { transaction }
          );
        }

        await transaction.commit();
      }

      return { success: true };
    } catch (error) {
      console.log(error);
      logger.error(`[Retrain callback -- at _saveHyperparameters] ${error}`);
      return { success: false, message: error };
    }
  },
  _savePerformanceMetrics: async (mp_id, result_data) => {
    logger.info(`[PC380] _savePerformanceMetrics triggered`);
    
    try {
      const mp = model_profile.findByPk(mp_id);

      if (!mp) {
        return {
          success: false,
          message: `Model with ID: ${mp_id} not found`,
        };
      }

      for await (const [model_type, model_data] of Object.entries(
        result_data
      )) {
        let updated_model_type = model_type.replaceAll("_", " ");
        sm_type = await sub_model_type.findOne({
          where: { model_type: updated_model_type },
        });

        if (!sm_type) {
          return {
            success: false,
            message: `Sub model type of type: ${model_type} not found`,
          };
        }

        smp = await sub_model_profile.findOne({
          where: {
            mp_id: mp_id,
            sm_type_id: sm_type.id,
          },
        });

        if (!smp) {
          return {
            success: false,
            message: `Sub model profile of ID: ${mp_id} and model type ${model_type} not found`,
          };
        }

        let transaction;

        transaction = await sequelize.transaction();

        for await (const [metric_name, metric_value] of Object.entries(
          model_data["performance_metrics"]["validation"]
        )) {
          let met_name = metric_name.toLowerCase();
          if (met_name == "rmse") {
            met_name = model_type.includes("fine")
              ? "rmse_fine"
              : model_type.includes("imprisonment")
              ? "rmse_imprisonment"
              : model_type.includes("bond")
              ? "rmse_bond"
              : "rmse_whipping";
          }

          if (met_name == "mae") {
            met_name = model_type.includes("fine")
              ? "mae_fine"
              : model_type.includes("imprisonment")
              ? "mae_imprisonment"
              : model_type.includes("bond")
              ? "mae_bond"
              : "mae_whipping";
          }

          if (metric_name == "AUC:type=Mu") {
            met_name = "auc";
          }

          m_type = await metric_type.findOne({
            where: { metric_name: met_name },
          });

          if (!m_type) {
            return {
              success: false,
              message: `Metric type of name: ${met_name} not found`,
            };
          }

          await sub_model_metric.create(
            {
              smp_id: smp.id,
              metric_value: metric_value,
              met_type_id: m_type.id,
            },
            { transaction }
          );
        }

        await transaction.commit();
      }

      return { success: true };
    } catch (error) {
      console.log(error);
      logger.error(`[Retrain callback] ${error}`);
      return { success: false, message: error };
    }
  },
  _saveFeatureList: async (mp_id, result_data) => {
    logger.info(`[PC380] _saveFeatureList triggered`);
    try {
      const mp = model_profile.findByPk(mp_id);
      if (!mp) {
        return { success: false, message: `Model with ID: ${mp_id} not found` };
      }

      for await (const [model_type, model_data] of Object.entries(
        result_data
      )) {
        let updated_model_type = model_type.replaceAll("_", " ");
        sm_type = await sub_model_type.findOne({
          where: { model_type: updated_model_type },
        });
        if (!sm_type) {
          return {
            success: false,
            message: `Sub model type of type: ${model_type} not found`,
          };
        }

        smp = await sub_model_profile.findOne({
          where: {
            mp_id: mp_id,
            sm_type_id: sm_type.id,
          },
        });
        if (!smp) {
          return {
            success: false,
            message: `Sub model profile of ID: ${mp_id} and model_type ${model_type} not found`,
          };
        }
        let transaction;
        transaction = await sequelize.transaction();

        feature_trained = { feature_names: [] };
        for await (const [feature_name] of Object.entries(
          model_data["feature_importance"]
        )) {
          feature_trained["feature_names"].push(feature_name);
        }

        await model_feature_list.create(
          {
            smp_id: smp.id,
            feature_name: JSON.stringify(feature_trained),
          },
          {
            transaction,
          }
        );

        await transaction.commit();
      }
      return { success: true };
    } catch (error) {
      console.log(error);
      logger.error(`[Retrain callback -- at _saveFeatureList] ${error}`);
      return { success: false, message: error };
    }
  },
  getActiveModelDDA12: async () => {
    try {
      let xtv = await model_profile.findOne({
        where: { training_status: "in_use", section_id: "1" },
        raw: true,
        attributes: ["id"],
      });
      if (!xtv) {
        return {
          success: false,
          message: `No active model found in this section.`,
        };
      } else {
        return {
          success: true,
          message: `Active model found`,
          data: xtv,
        };
      }
    } catch (error) {
      return { success: false, message: error };
    }
  },
  getActiveModelPC380: async () => {
    try {
      let xtv = await model_profile.findOne({
        where: { training_status: "in_use", section_id: "2" },
        raw: true,
        attributes: ["id"],
      });
      if (!xtv) {
        return {
          success: false,
          message: `No active model found in this section.`,
        };
      } else {
        return {
          success: true,
          message: `Active model found`,
          data: xtv,
        };
      }
    } catch (error) {
      return { success: false, message: error };
    }
  },
  getAllActiveModel: async () => {
    try {
      let xtv = await model_profile.findAll({
        where: { training_status: "in_use" },
        raw: true,
        attributes: ["id", "model_version", "trained_on", "activated_on", "section_id"],
      });
      if (!xtv) {
        return {
          success: false,
          message: `No active model found for all sections.`,
        };
      } else {
        return {
          success: true,
          message: `Active models found`,
          data: xtv,
        };
      }
    } catch (error) {
      return { success: false, message: error };
    }
  },
});