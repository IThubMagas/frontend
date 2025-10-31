<template>
  <div class="max-w-[1440px] h-screen mx-auto flex flex-col lg:flex-row">
    <!-- Левый блок -->
    <div class="hidden lg:block lg:w-[68.33%] h-full">
      <img 
        src="/auth/banner.png" 
        alt="Banner"
        class="w-full h-full object-cover"
      >
    </div>

    <!-- Правый блок -->
    <div class="w-full lg:w-[31.67%] h-screen p-[48px]">
     <div class="flex flex-col gap-[48px]">
        <img src="/auth/logo.png" alt="logo" class="h-[48px]">
        
        <div>
             <h2 class="font-bold text-[22px]">Приятно видеть вас снова</h2>
        </div>
     </div>
    </div>
  </div>
</template>


<script setup></script>