import React from 'react'

export const line = (
    <svg className="line" width="20" height="2" viewBox="0 0 20 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line y1="1" x2="20" y2="1" stroke="#DEDEDE" strokeWidth="2"/>
    </svg>
)

export const completed = (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="13" cy="13" rx="13" ry="13" fill="#6BC142"/>
    <path d="M7.51986 12.535L12.1861 18.3413M11.1804 18.3467L20.0928 7.14783" stroke="white" strokeWidth="2"/>
    </svg>
)

export const oneAcitve = (    
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="13" cy="13" rx="13" ry="13" fill="#6BC142"/>
    <ellipse cx="13" cy="13" rx="11.3226" ry="11.3226" fill="white"/>
    <path d="M13.3271 17H12.3281V10.3774L10.3247 11.1133V10.2109L13.1714 9.14209H13.3271V17Z" fill="#878787"/>
    </svg>
)

export const two = (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="13" cy="13" rx="13" ry="13" fill="#DEDEDE"/>
    <ellipse cx="13" cy="13" rx="11.3226" ry="11.3226" fill="white"/>
    <path d="M15.1855 17H10.0615V16.2856L12.7686 13.2778C13.1696 12.8231 13.4453 12.4543 13.5957 12.1714C13.7497 11.8849 13.8267 11.5895 13.8267 11.2852C13.8267 10.877 13.7031 10.5422 13.4561 10.2808C13.209 10.0194 12.8796 9.88867 12.4678 9.88867C11.9736 9.88867 11.5887 10.0301 11.313 10.313C11.0409 10.5923 10.9048 10.9826 10.9048 11.4839H9.91113C9.91113 10.7642 10.1421 10.1823 10.604 9.73828C11.0695 9.29427 11.6908 9.07227 12.4678 9.07227C13.1947 9.07227 13.7694 9.26383 14.1919 9.64697C14.6144 10.0265 14.8257 10.5332 14.8257 11.167C14.8257 11.9368 14.3351 12.8535 13.354 13.917L11.2593 16.189H15.1855V17Z" fill="#878787"/>
    </svg>
)

export const twoActive = (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="13" cy="13" rx="13" ry="13" fill="#6BC142"/>
    <ellipse cx="13" cy="13" rx="11.3226" ry="11.3226" fill="white"/>
    <path d="M15.1855 17H10.0615V16.2856L12.7686 13.2778C13.1696 12.8231 13.4453 12.4543 13.5957 12.1714C13.7497 11.8849 13.8267 11.5895 13.8267 11.2852C13.8267 10.877 13.7031 10.5422 13.4561 10.2808C13.209 10.0194 12.8796 9.88867 12.4678 9.88867C11.9736 9.88867 11.5887 10.0301 11.313 10.313C11.0409 10.5923 10.9048 10.9826 10.9048 11.4839H9.91113C9.91113 10.7642 10.1421 10.1823 10.604 9.73828C11.0695 9.29427 11.6908 9.07227 12.4678 9.07227C13.1947 9.07227 13.7694 9.26383 14.1919 9.64697C14.6144 10.0265 14.8257 10.5332 14.8257 11.167C14.8257 11.9368 14.3351 12.8535 13.354 13.917L11.2593 16.189H15.1855V17Z" fill="#878787"/>
    </svg>
)

export const three = (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="13" r="13" fill="#DEDEDE"/>
    <ellipse cx="13" cy="13" rx="11.3226" ry="11.3226" fill="white"/>
    <path d="M11.5063 12.6064H12.2529C12.722 12.5993 13.0908 12.4757 13.3594 12.2358C13.6279 11.9959 13.7622 11.6719 13.7622 11.2637C13.7622 10.347 13.3057 9.88867 12.3926 9.88867C11.9629 9.88867 11.6191 10.0122 11.3613 10.2593C11.1071 10.5028 10.98 10.8268 10.98 11.2314H9.98633C9.98633 10.612 10.2119 10.0981 10.6631 9.68994C11.1178 9.27816 11.6943 9.07227 12.3926 9.07227C13.1302 9.07227 13.7085 9.26742 14.1274 9.65771C14.5464 10.048 14.7559 10.5905 14.7559 11.2852C14.7559 11.6253 14.6449 11.9548 14.4229 12.2734C14.2044 12.5921 13.9054 12.8302 13.5259 12.9878C13.9556 13.1239 14.2868 13.3494 14.5195 13.6646C14.7559 13.9797 14.874 14.3646 14.874 14.8193C14.874 15.5212 14.6449 16.078 14.1865 16.4897C13.7282 16.9015 13.132 17.1074 12.3979 17.1074C11.6639 17.1074 11.0659 16.9087 10.604 16.5112C10.1457 16.1138 9.9165 15.5892 9.9165 14.9375H10.9155C10.9155 15.3493 11.0498 15.6787 11.3184 15.9258C11.5869 16.1729 11.9468 16.2964 12.3979 16.2964C12.8778 16.2964 13.2448 16.1711 13.499 15.9204C13.7533 15.6698 13.8804 15.3099 13.8804 14.8408C13.8804 14.3861 13.7407 14.0369 13.4614 13.7935C13.1821 13.55 12.7793 13.4246 12.2529 13.4175H11.5063V12.6064Z" fill="#878787"/>
    </svg>
)

export const threeActive = (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="13" r="13" fill="#6BC142"/>
    <ellipse cx="13" cy="13" rx="11.3226" ry="11.3226" fill="white"/>
    <path d="M11.5063 12.6064H12.2529C12.722 12.5993 13.0908 12.4757 13.3594 12.2358C13.6279 11.9959 13.7622 11.6719 13.7622 11.2637C13.7622 10.347 13.3057 9.88867 12.3926 9.88867C11.9629 9.88867 11.6191 10.0122 11.3613 10.2593C11.1071 10.5028 10.98 10.8268 10.98 11.2314H9.98633C9.98633 10.612 10.2119 10.0981 10.6631 9.68994C11.1178 9.27816 11.6943 9.07227 12.3926 9.07227C13.1302 9.07227 13.7085 9.26742 14.1274 9.65771C14.5464 10.048 14.7559 10.5905 14.7559 11.2852C14.7559 11.6253 14.6449 11.9548 14.4229 12.2734C14.2044 12.5921 13.9054 12.8302 13.5259 12.9878C13.9556 13.1239 14.2868 13.3494 14.5195 13.6646C14.7559 13.9797 14.874 14.3646 14.874 14.8193C14.874 15.5212 14.6449 16.078 14.1865 16.4897C13.7282 16.9015 13.132 17.1074 12.3979 17.1074C11.6639 17.1074 11.0659 16.9087 10.604 16.5112C10.1457 16.1138 9.9165 15.5892 9.9165 14.9375H10.9155C10.9155 15.3493 11.0498 15.6787 11.3184 15.9258C11.5869 16.1729 11.9468 16.2964 12.3979 16.2964C12.8778 16.2964 13.2448 16.1711 13.499 15.9204C13.7533 15.6698 13.8804 15.3099 13.8804 14.8408C13.8804 14.3861 13.7407 14.0369 13.4614 13.7935C13.1821 13.55 12.7793 13.4246 12.2529 13.4175H11.5063V12.6064Z" fill="#878787"/>
    </svg>
)

export const four = (    
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="13" r="13" fill="#DEDEDE"/>
    <ellipse cx="13" cy="13" rx="11.3226" ry="11.3226" fill="white"/>
    <path d="M14.2563 14.3735H15.3413V15.1846H14.2563V17H13.2573V15.1846H9.69627V14.5991L13.1982 9.17969H14.2563V14.3735ZM10.8242 14.3735H13.2573V10.5386L13.1391 10.7534L10.8242 14.3735Z" fill="#878787"/>
    </svg>
)

export const fourActive = (    
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="13" r="13" fill="#6BC142"/>
    <ellipse cx="13" cy="13" rx="11.3226" ry="11.3226" fill="white"/>
    <path d="M14.2563 14.3735H15.3413V15.1846H14.2563V17H13.2573V15.1846H9.69627V14.5991L13.1982 9.17969H14.2563V14.3735ZM10.8242 14.3735H13.2573V10.5386L13.1391 10.7534L10.8242 14.3735Z" fill="#878787"/>
    </svg>
)

export const five = (    
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="13" cy="13" rx="13" ry="13" fill="#DEDEDE"/>
    <ellipse cx="13" cy="13" rx="11.3226" ry="11.3226" fill="white"/>
    <path d="M10.5181 13.0791L10.9155 9.17969H14.9223V10.0981H11.7588L11.5224 12.2305C11.9056 12.0049 12.3406 11.8921 12.8276 11.8921C13.5402 11.8921 14.1059 12.1284 14.5249 12.6011C14.9438 13.0701 15.1533 13.7057 15.1533 14.5078C15.1533 15.3135 14.9349 15.9491 14.498 16.4146C14.0648 16.8765 13.4578 17.1074 12.6772 17.1074C11.9862 17.1074 11.4222 16.9159 10.9853 16.5327C10.5485 16.1496 10.2996 15.6196 10.2388 14.9429H11.1787C11.2396 15.3905 11.3989 15.7288 11.6567 15.958C11.9145 16.1836 12.2547 16.2964 12.6772 16.2964C13.1391 16.2964 13.5008 16.1388 13.7622 15.8237C14.0272 15.5086 14.1597 15.0736 14.1597 14.5186C14.1597 13.9958 14.0164 13.5768 13.73 13.2617C13.4471 12.943 13.0693 12.7837 12.5967 12.7837C12.1634 12.7837 11.8232 12.8786 11.5762 13.0684L11.313 13.2832L10.5181 13.0791Z" fill="#878787"/>
    </svg>
)

export const fiveActive = (    
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="13" cy="13" rx="13" ry="13" fill="#6BC142"/>
    <ellipse cx="13" cy="13" rx="11.3226" ry="11.3226" fill="white"/>
    <path d="M10.5181 13.0791L10.9155 9.17969H14.9223V10.0981H11.7588L11.5224 12.2305C11.9056 12.0049 12.3406 11.8921 12.8276 11.8921C13.5402 11.8921 14.1059 12.1284 14.5249 12.6011C14.9438 13.0701 15.1533 13.7057 15.1533 14.5078C15.1533 15.3135 14.9349 15.9491 14.498 16.4146C14.0648 16.8765 13.4578 17.1074 12.6772 17.1074C11.9862 17.1074 11.4222 16.9159 10.9853 16.5327C10.5485 16.1496 10.2996 15.6196 10.2388 14.9429H11.1787C11.2396 15.3905 11.3989 15.7288 11.6567 15.958C11.9145 16.1836 12.2547 16.2964 12.6772 16.2964C13.1391 16.2964 13.5008 16.1388 13.7622 15.8237C14.0272 15.5086 14.1597 15.0736 14.1597 14.5186C14.1597 13.9958 14.0164 13.5768 13.73 13.2617C13.4471 12.943 13.0693 12.7837 12.5967 12.7837C12.1634 12.7837 11.8232 12.8786 11.5762 13.0684L11.313 13.2832L10.5181 13.0791Z" fill="#878787"/>
    </svg>
)
