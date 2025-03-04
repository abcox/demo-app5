import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnChanges,
  OnInit,
  Renderer2,
  Signal,
  SimpleChanges,
  WritableSignal,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { tap } from 'rxjs/internal/operators/tap';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatRippleModule,
  ],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss',
})
export class SurveyComponent implements OnInit, OnChanges {
  dialog = inject(MatDialog);
  fb = inject(FormBuilder);
  survey = input.required<Survey>();
  vm!: WritableSignal<ViewModel>;
  selectedQuestion = 0;
  responses: any;
  formValid = false;

  constructor(private renderer: Renderer2) {}

  getSurveyWithFormGroups(survey: Survey): QuestionForm[] {
    const results = survey.questions.map((question, questionIndex) => {
      const formId = `f${questionIndex}`;
      const defaultOptionIndex = question.defaultOptionIndex;
      const formValue =
        question.type === 'select' && defaultOptionIndex !== undefined
          ? defaultOptionIndex
          : -1;
      const fields =
        question.type === 'checkbox'
          ? question.options.map((option, index) => {
              const result = {
                label: `${formId}_c${index}`,
                control: new FormControl(false),
              };
              return result;
            })
          : [
              {
                label: `${formId}_c0`,
                control: new FormControl(formValue),
              },
            ];
      // todo: add support for text input
      // todo: init responses with defaults
      const formFields: any = {};
      fields.forEach(field => {
        formFields[field.label] = field.control;
      });
      const formGroup = this.fb.group({ ...formFields });
      formGroup.valueChanges
        .pipe(
          tap((value: any) => {
            //console.log('value, question', {value, question});
            let response: any = {};
            let responses = Object.keys(value)
              .map((key, index) => {
                const optionIndex =
                  question.type === 'checkbox' ? index : value[key] ?? -1;
                const optionText = question.options[optionIndex]?.text;
                if (optionIndex === -1 || !optionText) {
                  return undefined; // skip invalid values / todo: review this because we need the response to be undefined to disabled the 'Next >' button
                }
                console.log('{ optionIndex, optionText, options }', {
                  optionIndex: optionIndex,
                  optionText: optionText,
                  options: question.options,
                });
                /* console.log('key, index, optionText', {
                  key,
                  index,
                  optionText,
                }); */
                if (question.type === 'checkbox' && !value[key]) {
                  return null; // skip false values on checkboxes
                }
                return {
                  controlId: key,
                  text: optionText,
                  questionOptionIndex: optionIndex,
                };
              })
              .filter((response: any) => response); // filter out null values
            //console.log('responses', responses);
            response[questionIndex] = {
              responses,
              question,
            };
            //console.log('response', response);
            if (response[questionIndex]?.responses?.length === 0) {
              response[questionIndex] = null; // if no responses, disable the 'Next >' button with a null response
            }
            this.responses = { ...this.responses, ...response };
            this.initResponsesCount();
            console.log('survey responses', this.responses);
            if (
              question.type === 'radio' &&
              this.selectedQuestion !== survey.questions.length - 1
            ) {
              this.next();
            }
            this.formValid =
              (this.responses?.count ?? 0) - 1 === survey.questions.length;
          })
        )
        .subscribe();
      const result = {
        ...question,
        name: formId,
        type: question.type,
        formGroup,
        fields /* [field] */,
      };
      //console.log(`result ${questionIndex}`, result);
      return result;
    });
    console.log('survey', results);
    return results;
  }
  ngOnInit() {
    this.initViewModel();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
  }
  initViewModel() {
    this.responses = undefined;
    this.vm = signal<ViewModel>({
      survey: {
        ...this.survey(),
        forms: this.getSurveyWithFormGroups(this.survey()),
      } as Survey,
    });
    this.responses = {
      ...this.getInitResponses(this.survey()),
      count: (this.responses ? Object.keys(this.responses)?.length : 0) ?? 0,
    };
    this.initResponsesCount();
  }
  getInitResponses(survey: Survey) {
    const responses: any = {};
    survey.questions.forEach((question, questionIndex) => {
      const defaultOptionIndex = question.defaultOptionIndex ?? -1;
      if (
        [-1, undefined].includes(defaultOptionIndex) || // no default option
        responses[questionIndex]?.responses?.length > 0 // already has responses
      ) {
        return;
      }
      responses[questionIndex] = {
        responses: [
          {
            controlId: `f${questionIndex}_c0`,
            text: question.options[defaultOptionIndex]?.text ?? undefined,
            questionOptionIndex: defaultOptionIndex,
          },
        ],
        question,
      };
    });
    return responses;
  }
  initResponsesCount() {
    const count = Object.keys(this.responses)?.length ?? 0; // count of questions with responses to enable the 'Submit' button
    console.log('survey responses', this.responses);
    this.responses.count = count;
  }
  toggleLinear(survey: Survey) {
    survey.isLinear = !survey.isLinear;
  }
  next(event?: any) {
    event?.preventDefault();
    this.selectedQuestion++;
  }
  previous(event: any) {
    event.preventDefault();
    this.selectedQuestion--;
  }
  submit(event: any) {
    event.preventDefault();
    //console.log('submit');
    //const defaultResponses = this.getInitResponses(this.survey());
    //this.responses = { ...defaultResponses, ...this.responses };
    console.log('survey responses', this.responses);
  }
  reset(event: any) {
    event.preventDefault();
    console.log('reset');
    this.openDialog().subscribe(response => {
      console.log('response', response);
      if (response?.ans === 'yes') {
        this.selectedQuestion = 0;
        this.initViewModel();
      }
    });
  }
  openDialog(): Observable<any> {
    let dialogRef = this.dialog.open(DialogContentComponent, {
      width: '250px',
      //data: { name: this.name, animal: this.animal },
    });
    return dialogRef.afterClosed(); /* .subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    }); */
  }

  // EXPERIMENTAL: method to handle click of a radio control where we want to reveal a subquestion based
  // on input to the parent.  ex: Yes/No, where "Yes" would reveal a sub-question to narrow
  // the subjective.
  // Reviewing the Google Forms app, we would be best to not make sub-questions, but rather
  // we will have questions that are linked to other questions based on specific answers. For example,
  // we can ask a yes/no multiple choice and then based on either the selection of yes/no, go to a
  // specific question.  The question would also need to be linked back to its dependent question in
  // order to provide navigation backwards?
  onClick(event: any, question: any, refIdPrefix: string, item: any) {
    const refId = `${refIdPrefix}${question.id}`;
    console.log(`onClick { question, item }`, question, item);
    const element = document.getElementById(refId);
    if (element && item?.question) {
      //event.preventDefault();
      console.log(`element`, element);
      this.renderer.setStyle(element, 'display', 'block'); // Example action
      //this.renderer.setProperty(element, 'hidden', 'false'); // Example action
      // Further modifications can be applied to `element` as needed
    } else {
      console.log(`failed to bind element with id ${refId}`);
    }
  }
}

// todo: refactor this to a re-usable component/service
@Component({
  selector: 'app-dialog-content',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // required by ngModel
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  template: `<!-- <h1 mat-dialog-title>Hi {{ data.name }}</h1> -->
    <h1 mat-dialog-title>Reset</h1>
    <div mat-dialog-content>
      <p>Do you want to start again?</p>
      <p>This action cannot be undone.</p>
      <!-- <mat-form-field>
        <input matInput [(ngModel)]="data.animal" />
      </mat-form-field> -->
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button [mat-dialog-close]="{ ans: 'yes' }" cdkFocusInitial>
        Yes
      </button>
    </div>`,
})
export class DialogContentComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface ViewModel {
  survey: Survey;
}

export interface Survey {
  description: string;
  //formGroup?: FormGroup;
  forms?: QuestionForm[];
  fields?: QuestionControl[];
  id: string;
  isLinear: boolean;
  name: string;
  questions: Question[];
  title: string;
  footnote?: string; // 'This is a preliminary survey.'
}

export interface Question {
  id: number;
  text: string;
  name?: string;
  note?: string;
  options: Option[];
  type?: 'checkbox' | 'select' | 'radio' | 'text';
  field?: QuestionField;
  defaultOptionIndex?: number | undefined;
  required?: boolean;
}

export interface QuestionField {
  label: string;
  placeholder: string;
  type: 'text' | 'select';
  options?: string[];
}

export interface QuestionControl extends QuestionField {
  control: FormControl;
}

export interface QuestionForm extends Question {
  //formControl: FormControl;
  formGroup: FormGroup;
}

interface Option {
  id: number;
  text: string;
  footnote?: string; // 'This is a preliminary question to understand your current experience, and you will be given more opportunity to provide details at a later time.'
  // Suggest to bring marketing in the form of explaining the value or benefits of the service. For example:
  // [Name of service] is a service that helps you [value proposition]. We want to make sure we are providing the best service possible, and we need your help to do that. Please take a few minutes to answer the following questions to help us understand your needs and preferences.
  // [Name of service] has more than 34,000 licensed professionals who are ready to help you with your [value proposition]. We want to make sure we are providing the best service possible, and we need your help to do that. Please take a few minutes to answer the following questions to help us understand your needs and preferences.
  // [Name of service] has more than 34,000 licensed and vetted professional therapists with different techniques and approaches.
  question?: Question;
  provideInput?: boolean;
}
