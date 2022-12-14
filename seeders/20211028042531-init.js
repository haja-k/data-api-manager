"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("sections", [
      {
        section_name: "dda12",
        created_at: new Date(),
      },
      {
        section_name: "pc380",
        created_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("sub_model_types", [
      { model_type: "Sentencing Classification" },
      { model_type: "Fine Amount Regression" },
      { model_type: "Imprisonment Duration Regression" },
      { model_type: "fine lower" },
      { model_type: "fine mid" },
      { model_type: "fine upper" },
      { model_type: "Fine Amount Min Regression" },
      { model_type: "Fine Amount Median Regression" },
      { model_type: "Fine Amount Max Regression" },
      { model_type: "imprisonment lower" },
      { model_type: "imprisonment mid" },
      { model_type: "imprisonment upper" },
      { model_type: "Imprisonment Duration Min Regression" },
      { model_type: "Imprisonment Duration Median Regression" },
      { model_type: "Imprisonment Duration Max Regression" },
      { model_type: "bond lower" },
      { model_type: "bond mid" },
      { model_type: "bond upper" },
      { model_type: "Bond Amount Min Regression" },
      { model_type: "Bond Amount Median Regression" },
      { model_type: "Bond Amount Max Regression" },
      { model_type: "whipping lower" },
      { model_type: "whipping mid" },
      { model_type: "whipping upper" },
      { model_type: "Whipping Amount Min Regression" },
      { model_type: "Whipping Amount Median Regression" },
      { model_type: "Whipping Amount Max Regression" }
    ]);
    await queryInterface.bulkInsert("metric_types", [
      { metric_name: "accuracy" },
      { metric_name: "multiclass" },
      { metric_name: "totalf1" },
      { metric_name: "auc" },
      { metric_name: "rmse_fine" },
      { metric_name: "rmse_imprisonment" },
      { metric_name: "rmse_bond" },
      { metric_name: "rmse_whipping" },
      { metric_name: "mae_fine" },
      { metric_name: "mae_imprisonment" },
      { metric_name: "mae_bond" },
      { metric_name: "mae_whipping" },
      { metric_name: "quantile:alpha=0.975" },
      { metric_name: "quantile:alpha=0.025" },
      { metric_name: "quantile:alpha=0.5" },
    ]);
    await queryInterface.bulkInsert("feature_lists", [
      {
        feature_name: "drug_type",
        section_id: "1",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "pd_nationality",
        section_id: "1",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "pd_gender",
        section_id: "1",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "sch_accused_plead_guilty",
        section_id: "1",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "pd_repeated_offence",
        section_id: "1",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "state",
        section_id: "1",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "weight_of_drug",
        section_id: "1",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "pd_age",
        section_id: "1",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "sentence_type",
        section_id: "1",
        feature_type: "target_features",
        isValid: true,
      },
      {
        feature_name: "ds_fine",
        section_id: "1",
        feature_type: "target_features",
        isValid: true,
      },
      {
        feature_name: "ds_fine_prison_by_days",
        section_id: "1",
        feature_type: "target_features",
        isValid: true,
      },
      {
        feature_name: "ds_imprisonment_by_days",
        section_id: "1",
        feature_type: "target_features",
        isValid: true,
      },
      {
        feature_name: "ds_imprisonment_effective_on",
        section_id: "1",
        feature_type: "target_features",
        isValid: true,
      },
      {
        feature_name: "ds_chk_fine",
        section_id: "1",
        feature_type: "target_features",
        isValid: true,
      },
      {
        feature_name: "ds_chk_imprisonment",
        section_id: "1",
        feature_type: "target_features",
        isValid: true,
      },
      {
        feature_name: "ds_chk_bond",
        section_id: "1",
        feature_type: "target_features",
        isValid: true,
      },
      {
        feature_name: "cas_case_no",
        section_id: "1",
        feature_type: "extra_features",
        isValid: true,
      },
      {
        feature_name: "sch_date",
        section_id: "1",
        feature_type: "extra_features",
        isValid: true,
      },
      {
        feature_name: "freq_last_1_month",
        section_id: "1",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "freq_last_2_month",
        section_id: "1",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "freq_last_3_month",
        section_id: "1",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "freq_last_4_month",
        section_id: "1",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "freq_last_5_month",
        section_id: "1",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "freq_last_6_month",
        section_id: "1",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "rampancy_last_1_month",
        section_id: "1",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "rampancy_last_2_month",
        section_id: "1",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "rampancy_last_3_month",
        section_id: "1",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "rampancy_last_4_month",
        section_id: "1",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "rampancy_last_5_month",
        section_id: "1",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "condition_of_item",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "cooperation_with_the_enforcement_officers",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "is_item_recovered",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "is_there_appeal",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "is_under_remand",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "state",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "pd_employment_status",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "pd_nationality",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "use_of_violence",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "previous_conviction_records",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "previous_conviction_same_offence",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "relationship_with_victim",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "restitution_of_item",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "pd_marital_status",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "sch_accused_found_guilty_after_ft",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "sch_accused_plead_guilty",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "monthly_income_range_group",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "is_public_interest",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "is_there_any_injury",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "pd_gender",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "age_range",
        section_id: "2",
        feature_type: "cat_input_features",
        isValid: true,
      },
      {
        feature_name: "number_of_dependants",
        section_id: "2",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "pd_age",
        section_id: "2",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "value_of_items",
        section_id: "2",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "number_of_convictions",
        section_id: "2",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "gap_from_previous_conviction_by_month",
        section_id: "2",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "freq_last_1_month",
        section_id: "2",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "freq_last_2_month",
        section_id: "2",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "freq_last_3_month",
        section_id: "2",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "freq_last_4_month",
        section_id: "2",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "freq_last_5_month",
        section_id: "2",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "freq_last_6_month",
        section_id: "2",
        feature_type: "num_input_features",
        isValid: true,
      },
      {
        feature_name: "sentence_type_pc380",
        section_id: "2",
        feature_type: "target_features",
        isValid: true,
      },
      {
        feature_name: "ds_fine",
        section_id: "2",
        feature_type: "target_features",
        isValid: true,
      },
      {
        feature_name: "ds_fine_prison_by_days",
        section_id: "2",
        feature_type: "target_features",
        isValid: true,
      },
      {
        feature_name: "ds_imprisonment_by_days",
        section_id: "2",
        feature_type: "target_features",
        isValid: true,
      },
      {
        feature_name: "ds_whipping",
        section_id: "2",
        feature_type: "target_features",
        isValid: true,
      },
      {
        feature_name: "ds_bond_amt",
        section_id: "2",
        feature_type: "target_features",
        isValid: true,
      },
      {
        feature_name: "sch_date",
        section_id: "2",
        feature_type: "extra_features",
        isValid: true,
      },
      {
        feature_name: "cas_case_no",
        section_id: "2",
        feature_type: "extra_features",
        isValid: true,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("model_feature_lists", null, {});
    await queryInterface.bulkDelete("sub_model_metrics", null, {});
    await queryInterface.bulkDelete("metric_types", null, {});
    await queryInterface.bulkDelete("model_hyperparameters", null, {});
    await queryInterface.bulkDelete("sub_model_profiles", null, {});
    await queryInterface.bulkDelete("dataset_details", null, {});
    await queryInterface.bulkDelete("log_retrain_submit", null, {});
    await queryInterface.bulkDelete("feature_lists", null, {});
    await queryInterface.bulkDelete("sub_model_types", null, {});
    await queryInterface.bulkDelete("model_profiles", null, {});
    await queryInterface.bulkDelete("sections", null, {});
  },
};
