/**
 * @file entity_browser.entity_reference.js
 *
 * Defines the behavior of the entity reference widget that utilizes entity
 * browser.
 */
(function ($, Drupal, drupalSettings) {

  "use strict";
  /**
   * Registers behaviours related to entity reference field widget.
   */
  Drupal.behaviors.entityBrowserEntityReference = {
    attach: function (context) {
      $(context).find('.field-widget-entity-browser-entity-reference').each(function () {
        $(this).find('.entities-list').sortable({
          stop: Drupal.entityBrowserEntityReference.entitiesReordered
        });
      });
    }
  };

  Drupal.entityBrowserEntityReference = {};

  /**
   * Reacts on "entities selected" event.
   *
   * @param event
   *   Event object.
   * @param entities
   *   Array of selected entities.
   */
  Drupal.entityBrowserEntityReference.selectionCompleted = function(event, uuid, entities) {
    // Update value form element with new entity IDs.
    var entity_ids = $(this).parent().parent().find('input[type*=hidden]').val();
    if (entity_ids.length != 0) {
      entity_ids = entity_ids + ' ';
    }

    entity_ids = entity_ids + $.map(entities, function(item) {return item[0]}).join(' ');
    $(this).parent().parent().find('input[type*=hidden]').val(entity_ids);
    $(this).parent().parent().find('input[type*=hidden]').trigger('entity_browser_value_updated');
  };

  /**
   * Reacts on sorting of the entities.
   *
   * @param event
   *   Event object.
   * @param ui
   *   Object with detailed information about the sort event.
   */
  Drupal.entityBrowserEntityReference.entitiesReordered = function(event, ui) {
    var items = $(this).find('li');
    var ids = [];
    for (var i = 0; i < items.length; i++) {
      ids[i] = $(items[i]).attr('data-entity-id');
    }

    $(this).parent().parent().find('input[type*=hidden]').val(ids.join(' '));
  };

}(jQuery, Drupal, drupalSettings));
