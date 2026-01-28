
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import HealthyLiving from './pages/HealthyLiving';
import Nutrition from './pages/Nutrition';
import NutritionNutrients from './pages/NutritionNutrients';
import NutritionPlate from './pages/NutritionPlate';
import NutritionLabels from './pages/NutritionLabels';
import NutritionPrep from './pages/NutritionPrep';
import Lifestyle from './pages/Lifestyle';
import Fitness from './pages/Fitness';
import Wellbeing from './pages/Wellbeing';
import HomeEnvironment from './pages/HomeEnvironment';
import Resources from './pages/Resources';
import AITools from './pages/AITools';
import Calculators from './pages/Calculators';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/healthy-living" element={<HealthyLiving />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/nutrition/nutrients" element={<NutritionNutrients />} />
          <Route path="/nutrition/plate" element={<NutritionPlate />} />
          <Route path="/nutrition/labels" element={<NutritionLabels />} />
          <Route path="/nutrition/prep" element={<NutritionPrep />} />
          <Route path="/nutrition/calculators" element={<Calculators />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/wellbeing" element={<Wellbeing />} />
          <Route path="/home-environment" element={<HomeEnvironment />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/ai-tools" element={<AITools />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
