import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  SurveyComponent,
  Survey,
} from '../../component/survey/survey.component';

@Component({
  selector: 'app-survey-page',
  standalone: true,
  imports: [SurveyComponent],
  templateUrl: './survey-page.component.html',
  styleUrl: './survey-page.component.scss',
})
export class SurveyPageComponent {
  survey: Survey = {
    description: 'This is a preliminary survey.',
    id: '1',
    isLinear: true,
    name: 'Test Survey',
    questions: [
      {
        id: 1,
        text: 'What type of therapy are you looking for?',
        options: [
          {
            id: 1,
            text: 'Individual (for myself)',
          },
          {
            id: 2,
            text: 'Couples (for myself and partner)',
          },
          {
            id: 3,
            text: 'Teen (for my child)',
          },
        ],
        type: 'radio',
      },
      {
        id: 2,
        text: 'What is your gender?',
        options: [
          {
            id: 1,
            text: 'Woman (female)',
          },
          {
            id: 2,
            text: 'Man (male)',
          },
          // more options...
          {
            id: 3,
            text: 'Non Binary (non-binary)',
          },
          {
            id: 4,
            text: 'Transfeminine',
          },
          {
            id: 5,
            text: 'Transmaculine',
          },
          {
            id: 6,
            text: 'Agender (genderless)',
          },
          {
            id: 7,
            text: "I don't know",
          },
          {
            id: 8,
            text: 'Prefer not to say',
          },
          {
            id: 9,
            text: 'Other', // specify
          },
        ],
        type: 'radio',
      },
      {
        id: 3,
        text: 'What is your age?', // we could ask what year and month they were born instead (and calculate age from that)
        options: [
          {
            id: 1,
            text: '18-24',
          },
          {
            id: 2,
            text: '25-34',
          },
          {
            id: 3,
            text: '35-44',
          },
          {
            id: 4,
            text: '45-54',
          },
          {
            id: 5,
            text: '55-64',
          },
          {
            id: 6,
            text: '65-74',
          },
          {
            id: 7,
            text: '75 or older',
          },
        ],
        type: 'radio',
      },
      {
        id: 4,
        text: 'How do you identify (your sexual orientation)?',
        options: [
          {
            id: 1, // ascending sort order
            text: 'Straight (heterosexual)',
          },
          {
            id: 2,
            text: 'Gay',
          },
          {
            id: 3,
            text: 'Lesbian',
          },
          {
            id: 4,
            text: 'Prefer not to say',
          },
          {
            id: 5,
            text: 'Bisexual',
          },
          {
            id: 6,
            text: 'Pansexual',
          },
          {
            id: 7,
            text: 'Asexual',
          },
          {
            id: 8,
            text: 'Queer',
          },
          {
            id: 9,
            text: 'Questioning',
          },
          {
            id: 10,
            text: "I don't know",
          },
          {
            id: 11,
            text: 'Other', // specify
          },
        ],
        type: 'radio',
      },
      {
        id: 5,
        text: 'What is your relationship status?',
        options: [
          {
            id: 1,
            text: 'Single',
          },
          {
            id: 2,
            text: 'In a relationship',
          },
          {
            id: 3,
            text: 'Married',
          },
          {
            id: 4,
            text: 'Divorced',
          },
          {
            id: 5,
            text: 'Widowed',
          },
          {
            id: 6,
            text: 'Separated',
          },
          {
            id: 7,
            text: "I don't know",
          },
          {
            id: 8,
            text: 'Prefer not to say',
          },
          // Other... (same as I don't know -- we move on to next question)
        ],
        type: 'radio',
      },
      {
        id: 6,
        text: 'Would you consider yourself to be religious?',
        options: [
          {
            id: 1,
            text: 'Yes',
            question: {
              id: 1,
              text: 'What religion do you practice?',
              options: [
                {
                  id: 1,
                  text: 'Christianity',
                },
                {
                  id: 2,
                  text: 'Judaism',
                },
                {
                  id: 3,
                  text: 'Islam',
                },
                // more options... ("Other" and we move on...)
                {
                  id: 4,
                  text: 'Hinduism',
                },
                {
                  id: 5,
                  text: 'Buddhism',
                },
                {
                  id: 6,
                  text: 'Sikhism',
                },
                {
                  id: 7,
                  text: 'Atheism',
                },
                {
                  id: 8,
                  text: 'Agnosticism',
                },
                {
                  id: 9,
                  text: 'Other',
                },
              ],
            },
          },
          {
            id: 2,
            text: 'No',
          },
        ],
        type: 'radio',
      },
      {
        id: 7,
        text: 'Would you consider yourself to be spiritual?',
        options: [
          {
            id: 1,
            text: 'Yes',
          },
          {
            id: 2,
            text: 'No',
          },
        ],
        type: 'radio',
      },
      {
        id: 8,
        text: 'Have you ever been in therapy before?', // e.g. counseling, psychotherapy, etc.
        options: [
          {
            id: 1,
            text: 'Yes',
          },
          {
            id: 2,
            text: 'No',
          },
          {
            id: 3,
            text: 'Prefer not to say',
          },
        ],
        type: 'radio',
      },
      {
        id: 9,
        text: 'What led you to consider therapy?', // e.g. depression, anxiety, trauma, relationship issues, etc.
        // check all that apply
        options: [
          {
            id: 0,
            text: "I've been feeling down, depressed, or hopeless",
          },
          {
            id: 1,
            text: 'I feel anxious, nervous, on edge, worried, or overwhelmed',
          },
          {
            id: 2,
            text: 'My mood is interfering with my work, study, or relationships',
          },
          {
            id: 3,
            text: 'I struggle with building or maintaining relationships',
          },
          {
            id: 4,
            text: "I can't find purpose or meaning in my life",
          },
          {
            id: 5,
            text: 'I am grieving',
          },
          {
            id: 5,
            text: 'I have experienced trauma or a traumatic event',
          },
          {
            id: 6,
            text: 'I need to talk through a specific challenge or problem',
          },
          {
            id: 7,
            text: 'I want to gain self-confidence or self-esteem',
          },
          {
            id: 8,
            text: "I want to improve myself, and I don't know where to start",
          },
          {
            id: 9,
            text: 'Recommended by a friend, close relationship, or doctor',
          },
          {
            id: 10,
            text: 'Just exploring my options',
          },
          {
            id: 11,
            text: 'Other', // specify
          },

          // more options...

          {
            id: 3,
            text: 'I struggle with maintaining a healthy lifestyle (e.g. eating, sleeping, exercise)',
          },

          // more options...

          {
            id: 2,
            text: 'I have experienced trauma or a traumatic event',
          },
          {
            id: 3,
            text: 'I have been having relationship issues',
          },
          {
            id: 4,
            text: 'I have been having family issues',
          },
          {
            id: 5,
            text: 'I have been experiencing work stress',
          },
          {
            id: 6,
            text: 'I have been experiencing life changes',
          },
          {
            id: 7,
            text: 'I have been struggling with addiction',
          },
          {
            id: 8,
            text: 'Other', // specify
            provideInput: true,
          },

          // more options... (co-pilot suggested)

          {
            id: 1,
            text: 'Depression',
          },
          {
            id: 2,
            text: 'Anxiety',
          },
          {
            id: 3,
            text: 'Trauma',
          },
          {
            id: 4,
            text: 'Relationship issues',
          },
          {
            id: 5,
            text: 'Family issues',
          },
          {
            id: 6,
            text: 'Work stress',
          },
          {
            id: 7,
            text: 'Life changes',
          },
          {
            id: 8,
            text: 'Addiction',
          },
          {
            id: 9,
            text: 'Other', // specify
          },
        ],
        type: 'checkbox',
      },
      {
        id: 10,
        text: 'What are your expections from your therapist? A therapist who...', // e.g. coping skills, self-awareness, self-improvement, etc.
        options: [
          {
            id: 0,
            text: 'Listens',
          },
          {
            id: 1,
            text: 'Explores my past',
          },
          {
            id: 2,
            text: 'Teaches me new skills',
          },
          {
            id: 3,
            text: 'Challenges my beliefs, thoughts, perceptions',
          },
          {
            id: 4,
            text: 'Assigns me homework or tasks',
          },
          {
            id: 5,
            text: 'Guides me to set goals',
          },
          {
            id: 6,
            text: 'Proactively checks in with me',
          },
          {
            id: 7,
            text: 'Other',
          },
          {
            id: 8,
            text: 'I am unsure, or open around what to expect',
          },

          // more options... (ABC)
          {
            id: 4,
            text: 'Provides alternative ideas, perspectives, or solutions',
          },

          // more options... (co-pilot suggested)
          {
            id: 1,
            text: 'Explores my thoughts and feelings',
          },

          // more options... (co-pilot suggested)
          {
            id: 1,
            text: 'Can help me develop coping skills',
          },
          {
            id: 2,
            text: 'Can help me develop self-awareness',
          },
          {
            id: 3,
            text: 'Can help me develop self-improvement',
          },
          {
            id: 4,
            text: 'Can help me develop self-confidence',
          },
          {
            id: 5,
            text: 'Can help me develop self-esteem',
          },
          {
            id: 6,
            text: 'Can help me develop self-compassion',
          },
          {
            id: 7,
            text: 'Can help me develop self-love',
          },
          {
            id: 8,
            text: 'Can help me develop self-acceptance',
          },
          {
            id: 9,
            text: 'Can help me develop self-forgiveness',
          },
          {
            id: 10,
            text: 'Can help me develop self-trust',
          },
          {
            id: 11,
            text: 'Can help me develop self-respect',
          },
          {
            id: 12,
            text: 'Can help me develop self-compassion',
          },
          {
            id: 13,
            text: 'Can help me develop self-love',
          },
          {
            id: 14,
            text: 'Can help me develop self-acceptance',
          },
          {
            id: 15,
            text: 'Can help me develop self-forgiveness',
          },
          {
            id: 16,
            text: 'Can help me develop self-trust',
          },
          {
            id: 17,
            text: 'Can help me develop self-respect',
          },
          {
            id: 18,
            text: 'Can help me develop self-compassion',
          },
          {
            id: 19,
            text: 'Can help me develop self-love',
          },
          {
            id: 20,
            text: 'Can help me develop self-acceptance',
          },
          {
            id: 21,
            text: 'Can help me develop self-forgiveness',
          },
          {
            id: 22,
            text: 'Can help me develop self-trust',
          },
        ],
        type: 'checkbox',
      },
      {
        id: 11,
        text: 'When was the last time you thought about suicide?', // e.g. self-harm, suicidal thoughts, etc.
        options: [
          {
            id: 0,
            text: 'Never',
          },
          {
            id: 1,
            text: 'Over a year ago',
          },
          {
            id: 2,
            text: 'Over 3 months ago',
          },
          {
            id: 3,
            text: 'Over a month ago',
          },
          {
            id: 4,
            text: 'Over 2 weeks ago',
          },
          {
            id: 5,
            text: 'In the last 2 weeks',
          },
        ],
        type: 'radio',
      },
      {
        id: 12,
        text: 'Are you currently experiencing anxiety, panic attacks, or have any phobias?',
        options: [
          {
            id: 0,
            text: 'No',
          },
          {
            id: 1,
            text: 'Yes',
          },
        ],
        type: 'radio',
      },
      {
        id: 13,
        text: 'Are you currently taking any medication?',
        options: [
          {
            id: 0,
            text: 'No',
          },
          {
            id: 1,
            text: 'Yes',
          },
        ],
        type: 'radio',
      },
      {
        id: 14,
        text: 'Are you currently experiencing any chronic pain?',
        options: [
          {
            id: 0,
            text: 'No',
          },
          {
            id: 1,
            text: 'Yes',
          },
        ],
        type: 'radio',
      },
      {
        id: 15,
        text: 'Are you currently experiencing anxiety, panic attacks, or have any phobias?',
        options: [
          {
            id: 0,
            text: 'No',
          },
          {
            id: 1,
            text: 'Yes',
          },
        ],
        type: 'radio',
      },
      {
        id: 16,
        text: 'How would you rate your current financial status?',
        options: [
          {
            id: 0,
            text: 'Good',
          },
          {
            id: 1,
            text: 'Fair',
          },
          {
            id: 2,
            text: 'Poor',
          },
        ],
        type: 'radio',
      },
      {
        id: 17,
        text: 'How would you rate your current sleeping habits?',
        options: [
          {
            id: 0,
            text: 'Good',
          },
          {
            id: 1,
            text: 'Fair',
          },
          {
            id: 2,
            text: 'Poor',
          },
        ],
        // example (probably better to abbreviate this or clamp for 'more' reading):
        note: 'Many adults who have generalized anxiety disorder also have sleep disorders. Adults with generalized anxiety disorder are more likely to have difficulty falling or staying asleep, may wake up frequently during the night, or may wake up early and not be able to go back to sleep. The combination of GAD and sleep disorders can lead to an even greater level of anxiety and dysfunction. If you are experiencing sleep problems, it is important to talk to your doctor about your symptoms.',
        type: 'radio',
      },
      {
        id: 18,
        text: 'Which of the following resources or activities might you find useful?',
        // check all that apply...
        options: [
          {
            id: 0,
            text: 'Support groups',
          },
          {
            id: 1,
            text: 'Therapy journal',
          },
          {
            id: 2,
            text: 'Worksheets',
          },
          {
            id: 3,
            text: 'Goal/habit tracking',
          },
          {
            id: 4,
            text: 'Educational webinars',
          },
          {
            id: 5,
            text: 'Other',
          },
          {
            id: 6,
            text: 'Unsure at this time',
          },
        ],
        type: 'checkbox',
      },
      {
        id: 19,
        text: 'How would you prefer your therapist to communicate with you?',
        options: [
          {
            id: 0,
            text: 'Mostly by messaging',
          },
          {
            id: 1,
            text: 'Mostly by phone or video sessions',
          },
          {
            id: 2,
            text: 'Not sure yet (choose later)',
          },

          // more options... (co-pilot suggested)
          {
            id: 0,
            text: 'In person',
          },
          {
            id: 1,
            text: 'Video call',
          },
          {
            id: 2,
            text: 'Phone call',
          },
          {
            id: 3,
            text: 'Chat',
          },
          {
            id: 4,
            text: 'Email',
          },
          {
            id: 5,
            text: 'Other',
          },
          {
            id: 6,
            text: 'Unsure at this time',
          },
        ],
        type: 'radio',
      },
      {
        id: 20,
        text: 'Are there any specific preferences for your therapist?',
        options: [
          {
            id: 0,
            text: 'Male therapist',
          },
          {
            id: 1,
            text: 'Female therapist',
          },
          {
            id: 2,
            text: 'Faith-based therapist',
          },
          {
            id: 3,
            text: 'Therapist who is among those of the LGBTQ+ community',
          },
          {
            id: 4,
            text: 'Mature therapist (older than 45 years of age)',
          },
          {
            id: 5,
            text: 'Non-religious therapist',
          },
          {
            id: 6,
            text: 'Black therapist',
          },
          {
            id: 7,
            text: 'Asian therapist',
          },
          {
            id: 8,
            text: 'No preference',
          },
        ],
        type: 'checkbox',
      },
      {
        id: 21,
        text: 'Who referred you to us, or how did you hear about us?',
        options: [
          {
            id: 0,
            text: 'TV or radio',
          },
          {
            id: 1,
            text: 'Podcast',
          },
          {
            id: 2,
            text: 'YouTube',
          },
          {
            id: 3,
            text: 'TikTok',
          },
          {
            id: 4,
            text: 'Mailer/direct mail',
          },
          {
            id: 5,
            text: 'Google search',
          },
          {
            id: 6,
            text: 'Celebrity',
          },
          {
            id: 7,
            text: 'Social media post',
          },
          {
            id: 8,
            text: 'Magazine or newspaper',
          },
          {
            id: 9,
            text: 'Streaming radio (Pandora, Spotify, etc.)',
          },
          {
            id: 10,
            text: 'Friend or family member',
          },
          {
            id: 11,
            text: 'Steaming TV (Hulu, Netflix, etc.)',
          },
          {
            id: 12,
            text: 'Other', // provide text input for details
            provideInput: true,
          },

          // more options... (co-pilot suggested)
          {
            id: 0,
            text: 'Friend or family member',
          },
          {
            id: 1,
            text: 'Doctor or healthcare professional',
          },
          {
            id: 2,
            text: 'Online search',
          },
          {
            id: 3,
            text: 'Social media',
          },
          {
            id: 4,
            text: 'Advertisement',
          },
          {
            id: 5,
            text: 'Other',
          },
          {
            id: 6,
            text: 'Unsure at this time',
          },
        ],
        type: 'radio',
      },
      {
        id: 22,
        text: 'Which country are you located in?',
        options: [
          {
            id: 0,
            text: 'United States',
          },
          {
            id: 1,
            text: 'Canada',
          },
          {
            id: 2,
            text: 'United Kingdom',
          },
          {
            id: 3,
            text: 'Australia',
          },
          {
            id: 4,
            text: 'New Zealand',
          },
          {
            id: 5,
            text: 'Other',
          },
          {
            id: 6,
            text: 'Unsure at this time',
          },
        ],
        type: 'select',
        //defaultOptionIndex: -1,
      },
      {
        id: 23,
        text: 'What is your preferred language?',
        options: [
          {
            id: 0,
            text: 'English', // default
          },
          {
            id: 1,
            text: 'Spanish',
          },
          {
            id: 2,
            text: 'French',
          },
          {
            id: 3,
            text: 'German',
          },
        ],
        type: 'select',
        defaultOptionIndex: 0,
      },
      {
        id: 24,
        text: 'Please mark all that apply.',
        options: [
          {
            id: 0,
            text: "I'm a student",
          },
          {
            id: 1,
            text: "I'm a veteran",
          },
          {
            id: 2,
            text: "I'm disabled",
          },
          {
            id: 3,
            text: "I'm a unemployed",
          },
          {
            id: 4,
            text: "I'm self-employed (working)",
          },
          {
            id: 5,
            text: "I'm self-employed (without work)",
          },
          {
            id: 6,
            text: 'Other',
            provideInput: true,
          },

          // more options... (co-pilot suggested)
          {
            id: 0,
            text: 'I am a healthcare professional',
          },
          {
            id: 1,
            text: 'I am a student',
          },
          {
            id: 2,
            text: 'I am a parent',
          },
          {
            id: 3,
            text: 'I am a caregiver',
          },
          {
            id: 4,
            text: 'I am a teacher',
          },
          {
            id: 5,
            text: 'I am a business owner',
          },
          {
            id: 6,
            text: 'I am a manager',
          },
          {
            id: 7,
            text: 'I am a frontline worker',
          },
          {
            id: 8,
            text: 'I am a first responder',
          },
          {
            id: 9,
            text: 'I am a military service member or veteran',
          },
          {
            id: 10,
            text: 'I am a member of the LGBTQ+ community',
          },
          {
            id: 11,
            text: 'I am a person of color',
          },
          {
            id: 12,
            text: 'I am a person with a disability',
          },
          {
            id: 13,
            text: 'I am a person with a chronic illness',
          },
          {
            id: 14,
            text: 'I am a person with a mental health condition',
          },
          {
            id: 15,
            text: 'I am a person with an eating disorder',
          },
          {
            id: 16,
            text: 'I am a person with an exercise disorder',
          },
          {
            id: 17,
            text: 'I am a person with a substance use disorder',
          },
          {
            id: 18,
            text: 'I am a person with a gambling disorder',
          },
        ],
        type: 'checkbox',
      },

      // Information
      /*

      1. Title: You've completed the questionnaire!  We need some information to create your account, and get you started...

      First name (or nickname)
      Email
      Confirm email
      Create password (bh1234$$)
      [ ] I agree to the terms and conditions, and privacy policy.

      2. Create pin (4 digits)
      >> 1234

      3. Two factor authentication (2FA) by email
      >> 4066
      Options:
      a) Resend email
      b) Update email address

      4. I prefer a therapist with experience in...

      Depression
      Stress and Anxiety
      Coping with additions
      LGBTQ+ related issues
      Relationship issues
      Family conflicts
      Trauma and abuse
      Coping with grief and loss
      Intimacy and sexual issues
      Eating disorders
      Sleep disorders
      Parenting issues
      Motivation, self-esteem, and confidence
      Anger management
      Career and work stress
      Bipolar disorder
      Coping with chronic illness
      Coping with life changes
      Exective and professional coaching
      Compassion fatigue
      Concentration, memory, and focus (ADHD)
      Other (provide input)

      5. Additional focus areas I prefer

      Communication problems
      Life purpose
      Isoation and loneliness
      Self-care and self-compassion (Self-love)
      Social Anxiety and Phobia
      Guilt and shame
      Post-traumatic stress disorder (PTSD)
      Postpartum depression
      Panic attacks or panic disorder
      Obsessive-compulsive disorder (OCD)
      Controlling or abusive relationships
      Forgiveness
      Caregiver stress
      Pregerancy and Childbirth
      Divorce and separation
      // Show more (link to expand list)
      Attachment issues
      Abondonment
      Body Image
      Mood Disorders
      Impulsivity
      Workplace issues
      Money and financial stress
      Chronic Pain Illness or Disability
      Women's issues
      Men's issues
      Sexuality
      Midlife crisis
      Narcissism (NPD / Narcissistic Personality Disorder)
      // more options (suggest by co-pilot)
      Borderline Personality Disorder
      Schizophrenia
      Dissociative Identity Disorder
      Eating Disorders
      Exercise Disorders
      Substance Use Disorders
      Gambling Disorders

      6. What brings you here?

      // Note:
      Join the 9,624 people that stated therapy with their tailored therapist match this week. Let your therapist know what you'd like to work on below. The more information you provide, the better your therapist will understand where to begin.

      Join the 9,624 people that stated therapy with their tailored therapist.  We have over 34,000 licensed professionals who are ready to help you with your needs.  We want to make sure we are providing the best service possible, and we need your help to do that.  Please take a few minutes to answer the following questions to help us understand your needs and preferences.

      [text input]

      Adam, Welcome to [name]!

      [Thank you message]

      What happens next? (What to expect)
      - You will receive a personalized match to a qualified and licensed therapist within 24 hours.
      - Your therapist will thoughtfull review what you've shared and reach out to you.
      - You can begin communicating with your therapist online, and your therapy process will begin.

      Who will be my therapist?
      We'll look for a personalized therapist match based on your preferences of:
        - A therapist who has experience treating:
          Stress and Anxiety, Life Purpose [... the list of choices listed here...]

      How do I talk to my therapist?
      You have many options for how you choose to communicate with your therapist. You can send audio, video, or text
      messages to your therapist at any time in the messaging room. You can also schedule weekly live sessions (30 to 45 min)
      with your therapist to communcate via phone, video, or live chat.

      What if I don't like the therapist that was matched to me?
      You can ask to be match to a different therapist. [Service provider name] has over 30,000 therapists with different
      qualifications and areas of expertise that are available based upon your location, preferences, and availability.

      How much will it costs?
      With [Service provider] you can have professional therapy at a fraction of the cost of traditional therapy.  The
      cost is either $85 CAD per week (discounted fee to accommodate current fiscal challenges). Unlike traditional in-office
      therapy, which cost 200-300 CAD per session, your [Service provider] membership includes a weekly live session (video,
      phone, or chat), and the ability to message your therapist any time, from anywhere. Your subscription is billed and
      renewed every 4 weeks unless it is cancelled. This includes both the use of this secured platform and the services of
      the therapist.

      What can I expect regarding the length of time to experience results?

      After 3 months of therapy with [Service provider]
      - 67% of our users with anxiety report improvement
      - 72% of our users with depression improved

      [Insert service level vs. cost comparison chart]


      [Insert cost quote and payment form]

      [Insert page footer with site map navigation and social media links]

      [Insert links to Terms of Service, Privacy Policy, and Security Policy]

      */

      // more options... (co-pilot suggested)
      {
        id: 17,
        text: 'How would you rate your current eating habits?',
        options: [
          {
            id: 0,
            text: 'Good',
          },
          {
            id: 1,
            text: 'Fair',
          },
          {
            id: 2,
            text: 'Poor',
          },
        ],
        type: 'radio',
        // example (probably better to abbreviate this or clamp for 'more' reading):
        note: 'Many adults who have generalized anxiety disorder also have eating disorders. Adults with generalized anxiety disorder are more likely to have difficulty eating, may eat frequently during the day, or may eat early and not be able to stop. The combination of GAD and eating disorders can lead to an even greater level of anxiety and dysfunction. If you are experiencing eating problems, it is important to talk to your doctor about your symptoms.',
      },
      {
        id: 18,
        text: 'How would you rate your current exercise habits?',
        options: [
          {
            id: 0,
            text: 'Good',
          },
          {
            id: 1,
            text: 'Fair',
          },
          {
            id: 2,
            text: 'Poor',
          },
        ],
        type: 'radio',
        // example (probably better to abbreviate this or clamp for 'more' reading):
        note: 'Many adults who have generalized anxiety disorder also have exercise disorders. Adults with generalized anxiety disorder are more likely to have difficulty exercising, may exercise frequently during the day, or may exercise early and not be able to stop. The combination of GAD and exercise disorders can lead to an even greater level of anxiety and dysfunction. If you are experiencing exercise problems, it is important to talk to your doctor about your symptoms.',
      },
      {
        id: 21,
        text: 'Do you have any other health conditions?',
        options: [
          {
            id: 0,
            text: 'No',
          },
          {
            id: 1,
            text: 'Yes', // provide text input for details
          },
        ],
        type: 'radio',
      },

      // experimental (suggested by co-pilot)
      {
        id: 9,
        text: 'Have you ever been diagnosed with a mental health condition?', // e.g. depression, anxiety, bipolar disorder, etc.
        options: [
          {
            id: 1,
            text: 'Yes',
          },
          {
            id: 2,
            text: 'No',
          },
          {
            id: 3,
            text: 'Prefer not to say',
          },
        ],
        type: 'radio',
      },
      {
        id: 10,
        text: 'What is your employment status?',
        options: [
          {
            id: 1,
            text: 'Employed',
          },
          {
            id: 2,
            text: 'Unemployed',
          },
          {
            id: 3,
            text: 'Student',
          },
          {
            id: 4,
            text: 'Retired',
          },
          {
            id: 5,
            text: 'Prefer not to say',
          },
        ],
        type: 'radio',
      },
      {
        id: 7,
        text: 'What is your highest level of education?',
        options: [
          {
            id: 1,
            text: 'Less than high school',
          },
          {
            id: 2,
            text: 'High school diploma or equivalent (GED)',
          },
          {
            id: 3,
            text: 'Some college, no degree',
          },
          {
            id: 4,
            text: "Associate's degree",
          },
          {
            id: 5,
            text: "Bachelor's degree",
          },
          {
            id: 6,
            text: "Master's degree",
          },
          {
            id: 7,
            text: 'Professional degree (MD, JD, etc.)',
          },
          {
            id: 8,
            text: 'Doctorate degree (PhD, EdD, etc.)',
          },
          {
            id: 9,
            text: 'Prefer not to say',
          },
        ],
        type: 'radio',
      },
      {
        id: 11,
        text: 'What is your annual household income?',
        options: [
          {
            id: 1,
            text: 'Less than $25,000',
          },
          {
            id: 2,
            text: '$25,000 - $49,999',
          },
          {
            id: 3,
            text: '$50,000 - $74,999',
          },
          {
            id: 4,
            text: '$75,000 - $99,999',
          },
          {
            id: 5,
            text: '$100,000 - $149,999',
          },
          {
            id: 6,
            text: '$150,000 - $199,999',
          },
          {
            id: 7,
            text: '$200,000 or more',
          },
          {
            id: 8,
            text: 'Prefer not to say',
          },
        ],
        type: 'radio',
      },
    ],
    title: 'Preliminary Survey',
  };
}
