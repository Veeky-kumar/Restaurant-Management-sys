jQuery(document).ready(function(){       
    
    jQuery('.datetimepicker').datepicker({
        timepicker: true,
        language: 'en',
        range: true,
        multipleDates: true,
            multipleDatesSeparator: " - "
      });
    jQuery("#add-event").submit(function(){
        alert("Submitted");
        var values = {};
        $.each($('#add-event').serializeArray(), function(i, field) {
            values[field.name] = field.value;
        });
        console.log(
          values
        );
    });
  });
  
      (function() {
          'use strict';
          // ------------------------------------------------------- //
          // Calendar
          // ------------------------------------------------------ //
          jQuery(function() {
              // page is ready
              jQuery('#calendar').fullCalendar({
                  themeSystem: 'bootstrap4',
                  height: 'auto',
                  // emphasizes business hours
                  businessHours: false,
                  defaultView: 'month',
                  firstDay: 1,
                  //locale: 'fr', // the initial locale
                  // event dragging & resizing
                  editable: true,
                  weekNumbers: true,
                  weekNumbersWithinDays: true,
                  showNonCurrentDates: false,
                  code: "fr",
                  week: {
                      dow: 1, // Monday is the first day of the week.
                      doy: 4 // The week that contains Jan 4th is the first week of the year.
                  },
                  buttonText: {
                      today: "Aujourd'hui",
                      year: "Année",
                      month: "Mois",
                      week: "Semaine",
                      day: "Jour",
                      list: "Planning"
                  },
                  weekLabel: "Sem.",
                  allDayHtml: "Toute la<br/>journée",
                  eventLimitText: "en plus",
                  noEventsMessage: "Aucun événement à afficher",
                  // header
                  header: {
                      left: 'addEventBtn',
                      center: 'title',
                      right: 'today prev,next'
                  },
                  /*   <button type = "button" class = "btn btn-primary" title = "Ajouté un événement" > < i class = "fa fa-plus" > < /i></button > */
                  customButtons: {
                      addEventBtn: {
                          text: 'nouvel événement',
                          click: function(element) {
                              (async function backAndForth() {
                                  const steps = ['1', '2', '3'];
                                  const values = [];
                                  var current_step_prev = null;
                                  var contenu_label = '';
                                  var contenu_select = event_select_user_assign;
                                  var contenu_html = contenu_label + '...';
                                  let currentStep;
  
                                  swal.setDefaults({
                                      confirmButtonText: 'Suivant &rarr;',
                                      cancelButtonText: '<i class="fa fa-undo"></i> Retour',
                                      progressSteps: steps
                                      //  showLoaderOnConfirm: true
                                  })
  
                                  for (currentStep = 0; currentStep < 3;) {
                                      console.log('starter : ' + currentStep);
                                      if (currentStep == 0) {
                                          contenu_label = "Période d'application de l'événement";
                                          contenu_html = contenu_label + ' <br/> <input class="form-control " type="text" id="term_period" name="daterange_new_event" value="" />';
                                      }
                                      if (currentStep == 1) {
                                          contenu_label = "Personne associée à l'événement";
                                          contenu_html = contenu_label + ' <select class="form-control" id="event_new_associated_user"> ' + contenu_select + ' </select>';
                                      }
                                      if (currentStep == 2) {
                                          contenu_label = "Commentaire de l'événement";
                                          contenu_html = contenu_label + ' <textarea class="form-control" id="event_new_comment" rows="3"></textarea>';
                                      }
  
                                      const result = await swal({
                                          title: 'étape ' + steps[currentStep],
                                          //  inputValue: values[currentStep] ? values[currentStep] : 'nope',
                                          showCloseButton: currentStep == 0,
                                          showCancelButton: currentStep > 0,
                                          currentProgressStep: currentStep,
                                          html: contenu_html,
                                          onOpen: function() {
                                              if (current_step_prev == -1) {
                                                  swal.resetValidationMessage();
                                              }
                                              if (currentStep == 0) {
                                                  if (current_step_prev == -1) {
                                                      var split_1 = values[currentStep].split(' - ');
                                                      var split_first_date = split_1[0].split('/');
                                                      var split_last_date = split_1[1].split('/');
                                                      var first_d = new Date(split_first_date[1] + '/' + split_first_date[0] + '/' + split_first_date[2]);
                                                      var last_d = new Date(split_last_date[1] + '/' + split_last_date[0] + '/' + split_last_date[2]);
  
                                                  } else {
                                                      var current = new Date();
                                                      var nb_day_in_week = 5;
                                                      var number_day_in_week = current.getDay();
                                                      var first_date_in_week = current.getDate() - (number_day_in_week - 1);
                                                      var last_date_in_week = current.getDate() + (nb_day_in_week - number_day_in_week);
  
                                                      var current = new Date();
                                                      var first_d = new Date();
                                                      var last_d = new Date();
                                                      var day_tag = current.getDay();
                                                      var first_day = current.getDate() - (day_tag - 1);
                                                      var last_day = current.getDate() + (5 - day_tag);
                                                      first_d.setDate(first_day);
                                                      last_d.setDate(last_day);
  
                                                  }
  
                                                  var options = {
                                                      weekday: 'long',
                                                      year: 'numeric',
                                                      month: 'long',
                                                      day: 'numeric'
                                                  };
  
                                                  var first = first_d.toLocaleDateString(undefined, options);
                                                  first_d.setMonth(first_d.getMonth() + 1);
                                                  var last = last_d.toLocaleDateString(undefined, options);
                                                  last_d.setMonth(last_d.getMonth() + 1);
  
                                                  var startDate = first_d.getFullYear() + '-' + set_zero_data_date(first_d.getMonth()) + first_d.getMonth() + '-' + set_zero_data_date(first_d.getDate()) + first_d.getDate();
                                                  var endDate = last_d.getFullYear() + '-' + set_zero_data_date(last_d.getMonth()) + last_d.getMonth() + '-' + set_zero_data_date(last_d.getDate()) + last_d.getDate();
  
                                                  $('input[name="daterange_new_event"]').daterangepicker({
                                                      "showDropdowns": true,
                                                      "showWeekNumbers": true,
                                                      "autoApply": true,
                                                      "startDate": new Date(startDate),
                                                      "endDate": new Date(endDate),
                                                      "opens": "center",
                                                      "applyButtonClasses": "btn-info",
                                                      "locale": {
                                                          "format": "DD/MM/YYYY",
                                                          "separator": " - ",
                                                          "applyLabel": "Appliquer",
                                                          "cancelLabel": "Annuler",
                                                          "fromLabel": "De",
                                                          "toLabel": "A",
                                                          "customRangeLabel": "Personnaliser",
                                                          "weekLabel": "S",
                                                          "daysOfWeek": [
                                                              "Dim",
                                                              "Lun",
                                                              "Mar",
                                                              "Mer",
                                                              "Jeu",
                                                              "Ven",
                                                              "Sam"
                                                          ],
                                                          "monthNames": [
                                                              "Janvier",
                                                              "Février",
                                                              "Mars",
                                                              "Avril",
                                                              "Mai",
                                                              "Juin",
                                                              "Juillet",
                                                              "Août",
                                                              "Septembre",
                                                              "Octobre",
                                                              "Novembre",
                                                              "Décembre"
                                                          ],
                                                          "firstDay": 1
                                                      }
  
                                                  });
  
                                                  $('input[name="daterange_new_event"]').on('apply.daterangepicker', function(ev, picker) {
                                                      $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
                                                      console.log('apply  ' + $(this).val());
                                                  });
  
                                                  $('input[name="daterange_new_event"]').on('cancel.daterangepicker', function(ev, picker) {
                                                      $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
                                                      console.log('cancel  ' + $(this).val());
                                                  });
  
                                                  if (currentStep == current_step_prev) {
                                                      swal.showValidationMessage(`Erreur ! une permanence a déjà été affectée pour cette période.`);
                                                  }
                                              }
                                              if (currentStep == 1) {
                                                  if (current_step_prev == -1) {
                                                      $('#event_new_associated_user')[0].value = values[currentStep];
                                                  }
                                                  if (currentStep == current_step_prev) {
                                                      swal.showValidationMessage(`Erreur ! Vous devez assigner quelqu'un à la permanence.`);
                                                  }
                                              }
                                              if (currentStep == 2) {
                                                  if (current_step_prev == -1) {
                                                      $('#event_new_comment')[0].value = values[currentStep];
                                                  }
                                                  if (currentStep == current_step_prev) {
                                                      swal.showValidationMessage(`Erreur ! Un prolbème est surnenu avec votre commentaire.`);
                                                  }
                                              }
  
                                          }
                                      });
  
  
                                      if (result.value) {
                                          // values[currentStep] = result.value
                                          if (currentStep === 0) {
                                              values[currentStep] = $('input[name="daterange_new_event"]')[0].value
                                              var dates = ($('input[name="daterange_new_event"]')[0].value).split(' - ');
                                              // Set la date de départ  pour la base
                                              var data_first_date = (dates[0]).split('/');
                                              data_first_date = (data_first_date.reverse()).join('-'); // YYYY - DD - MM
                                              data_first_date = new Date(data_first_date);
                                              data_first_date = data_first_date.getFullYear() + '-' + set_zero_data_date(data_first_date.getMonth() + 1) +
                                                  (data_first_date.getMonth() + 1) + '-' + set_zero_data_date(data_first_date.getDate()) + data_first_date.getDate();
  
                                              // Set la date de fin pour la base
                                              var data_last_date = (dates[1]).split('/');
                                              data_last_date = (data_last_date.reverse()).join('-'); // YYYY - DD - MM
                                              data_last_date = new Date(data_last_date);
                                              data_last_date = data_last_date.getFullYear() + '-' + set_zero_data_date(data_last_date.getMonth() + 1) +
                                                  (data_last_date.getMonth() + 1) + '-' + set_zero_data_date(data_last_date.getDate()) + data_last_date.getDate();
  
                                              // Set la date de fin +1jours pour le test dans la liste des events JSON
                                              var data_last_date_event = new Date(data_last_date);
                                              data_last_date_event = new Date(data_last_date_event.setDate(data_last_date_event.getDate() + 1));
                                              data_last_date_event = data_last_date_event.getFullYear() + '-' + set_zero_data_date(data_last_date_event.getMonth() + 1) +
                                                  (data_last_date_event.getMonth() + 1) + '-' + set_zero_data_date(data_last_date_event.getDate()) + data_last_date_event.getDate();
  
                                              // test dans la liste des events si aucun eventPlanAll est déjà present sur cette periode
                                              var next_step_is_possible = 0;
                                              for (var i = 0; i < event_json.length; i++) {
                                                  var ele = event_json[i];
                                                  var iconEventPlanAll = 'user-friends';
                                                  // si le start et le end +1jours et icon sont égale à l'une des entrées dans le JSON on break sinon on passe.
                                                  if (ele.start == data_first_date && ele.end == data_last_date_event && ele.icon == iconEventPlanAll) {
                                                      var next_step_is_possible = 1;
                                                      break;
                                                  }
                                              }
  
                                              // selon le next_step_is_possible l'action change
                                              if (next_step_is_possible == 0) {
                                                  currentStep++;
                                              } else {
                                                  current_step_prev = currentStep;
  
                                              }
  
                                          } else if (currentStep === 1) {
                                              if ($('#event_new_associated_user')[0].value != '...') {
                                                  values[currentStep] = $('#event_new_associated_user')[0].value;
                                                  currentStep++;
                                              } else {
                                                  current_step_prev = currentStep;
                                              }
  
                                          } else if (currentStep === 2) {
                                              console.log('je suis la dernière étape')
                                              values[currentStep] = $('#event_new_comment')[0].value;
                                              currentStep++;
                                          }
  
                                          //  currentStep++;
                                          console.log(result.value);
  
                                          if (currentStep === 3) {
                                              // l'envoi des infos dans la base + sweet valid ou error
                                              swal.resetDefaults();
                                              $.ajax({
                                                  type: 'POST',
                                                  url: 'pages/ajout_de_donnees/load_plan_ann.php',
                                                  data: 'choose=sendNewEventPlan&json=' + JSON.stringify(values),
                                                  success: function(data) {
                                                      console.log(data);
                                                      /*  if (data == 0) {
                                                           var type_confirm = 'success';
                                                           var title_confirm = 'Ok! ';
                                                           var text_confirm = "L'enregistrement de l'événement c'est bien passer !";
                                                       } else {
                                                           var type_confirm = 'error';
                                                           var title_confirm = 'Oops...';
                                                           var text_confirm = "Quelque chose à empêché l'enregistrement de l'événement !";
                                                       }
  
                                                       swal({
                                                           type: type_confirm,
                                                           title: title_confirm,
                                                           text: text_confirm,
                                                           showConfirmButton: false,
                                                           showCloseButton: false,
                                                           showCancelButton: false,
                                                           timer: 4000
                                                       }); */
                                                  }
                                              });
  
                                              break
                                          }
                                      } else if (result.dismiss === 'cancel') {
                                          console.log('current step : ' + currentStep);
                                          currentStep--;
                                          console.log('current step now : ' + currentStep);
                                          current_step_prev = -1;
                                      }
                                  }
                              })()
                          }
                      }
                  },
                  events: /* event_json */
                  [{
                              title: 'DOLAIS-PICOT Alizée',
                              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
                              start: '2020-03-03',
                              end: '2020-03-08',
                              className: 'fc-bg-lightgreen',
                              icon: "user-friends"
                          },
                          {
                              title: 'Double test',
                              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
                              start: '2020-03-04',
                              end: '2020-03-07',
                              className: 'fc-bg-lightgreen',
                              icon: "user-friends"
                          },
                          {
                              title: 'GENNADE Jean-Marc',
                              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
                              start: '2020-03-10',
                              end: '2020-03-15',
                              className: 'fc-bg-blue',
                              icon: "user-friends"
                          }
                      ] 
                  ,
                  eventRender: function(event, element) {
                      if (event.icon) {
                          element.find(".fc-title").prepend("<i class='fa fa-" + event.icon + "'></i>");
                      }
                  },
                  dayClick: function() {
                      jQuery('#modal-view-event-add').modal();
                  },
                  eventClick: function(event, jsEvent, view) {
                      const options = {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                      };
                      //  console.log(event);
                      /* affiche l'icon de l'évenement */
                      jQuery('.event-icon').html("<i class='fa fa-" + event.icon + "'></i>");
                      /* affiche le "titre" de l'évenement */
                      jQuery('.event-title').html(event.title);
                      /*  si l'évenement est un set plan all (A changer dans un if si plusieurs evenement sont possible) */
                      var value_title = $('.event-title').html();
                      set_list_user_affect_event_plan_ann(value_title);
  
                      /* affiche le commentaire lié à l'évenement */
                      jQuery('.event-body').html(event.description);
                      $('#affected_msg_event_plan_ann')[0].value = event.description;
  
                      /* set le start event en DATE */
                      event.start._i = new Date(event.start._i);
                      /* stock le start event en lettre FR */
                      var event_start_letter = event.start._i.toLocaleDateString(undefined, options);
                      /* set le start event en letter dans le titre de la modal */
                      jQuery('.event-start').html(event_start_letter);
                      /* set la valeur date du start event dans le formulaire */
                      $('#date_start_plan_all')[0].value = event.start._i;
  
                      /* set date du end en DATE et retire 1 jours */
                      event.end._i = new Date(event.end._i);
                      event.end._i.setDate(event.end._i.getDate() - 1);
                      event.end._i.setMonth(event.end._i.getMonth() + 1);
                      var set_zero_month = '';
                      var set_zero_day = '';
  
                      /* re forme la date au bon affichage */
                      event.end._i = event.end._i.getFullYear() + '-' + set_zero_data_date(event.end._i.getMonth()) +
                          event.end._i.getMonth() + '-' + set_zero_data_date(event.end._i.getDate()) + event.end._i.getDate();
  
                      /* set date start et date end en DATE */
                      event.start._i = new Date(event.start._i);
                      event.end._i = new Date(event.end._i);
                      /* stocke le end date en lettre FR dans le titre */
                      var event_end_letter = event.end._i.toLocaleDateString(undefined, options);
                      jQuery('.event-end').html(event_end_letter);
                      $('#date_end_plan_all')[0].value = event.end._i;
  
                      /* instancie le date picker avec les dates de l'evenement */
                      $('input[name="daterange_event"]').daterangepicker({
                          "showDropdowns": true,
                          "showWeekNumbers": true,
                          "autoApply": true,
                          "startDate": event.start._i,
                          "endDate": event.end._i,
                          "opens": "center",
                          "applyButtonClasses": "btn-info",
                          "locale": {
                              "format": "DD/MM/YYYY",
                              "separator": " - ",
                              "applyLabel": "Appliquer",
                              "cancelLabel": "Annuler",
                              "fromLabel": "De",
                              "toLabel": "A",
                              "customRangeLabel": "Personnaliser",
                              "weekLabel": "S",
                              "daysOfWeek": [
                                  "Dim",
                                  "Lun",
                                  "Mar",
                                  "Mer",
                                  "Jeu",
                                  "Ven",
                                  "Sam"
                              ],
                              "monthNames": [
                                  "Janvier",
                                  "Février",
                                  "Mars",
                                  "Avril",
                                  "Mai",
                                  "Juin",
                                  "Juillet",
                                  "Août",
                                  "Septembre",
                                  "Octobre",
                                  "Novembre",
                                  "Décembre"
                              ]
                          }
  
                      });
  
  
                      /*  jQuery('.eventUrl').attr('href', event.url); */
                      jQuery('#modal-view-event').modal();
                  },
              })
          });
  
      })(jQuery);